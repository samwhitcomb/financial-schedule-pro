import { Express } from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { type User } from "./schema";
import jwt from "jsonwebtoken";

const scryptAsync = promisify(scrypt);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function hashPassword(password: string) {
  try {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

async function comparePasswords(supplied: string, stored: string) {
  try {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
}

function generateToken(user: User): string {
  try {
    return jwt.sign(
      { 
        id: user.id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
}

export function setupAuth(app: Express) {
  // Authentication middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      jwt.verify(token, JWT_SECRET, async (err: any, user: any) => {
        if (err) {
          console.error('Token verification error:', err);
          return res.status(403).json({ message: "Invalid token" });
        }

        const dbUser = await storage.getUser(user.id);
        if (!dbUser) {
          return res.status(403).json({ message: "User not found" });
        }

        req.user = dbUser;
        next();
      });
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ message: "Authentication failed" });
    }
  };

  // Register new user
  app.post("/api/register", async (req, res) => {
    try {
      console.log('Registration request received:', { username: req.body.username, email: req.body.email });
      
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        console.log('Username already exists:', req.body.username);
        return res.status(400).json({ message: "Username already exists" });
      }

      const emailUser = await storage.getUserByEmail(req.body.email);
      if (emailUser) {
        console.log('Email already in use:', req.body.email);
        return res.status(400).json({ message: "Email already in use" });
      }

      // Set trial dates
      const now = new Date();
      const trialEndDate = new Date(now);
      trialEndDate.setDate(now.getDate() + 30); // 30 day trial

      const hashedPassword = await hashPassword(req.body.password);
      console.log('Password hashed successfully');

      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
        trialStartDate: now,
        trialEndDate: trialEndDate,
        trialActive: true,
      });
      console.log('User created successfully:', { id: user.id, username: user.username });

      const token = generateToken(user);
      console.log('Token generated successfully');

      res.status(201).json({ user, token });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Login
  app.post("/api/login", async (req, res) => {
    try {
      console.log('Login attempt:', { username: req.body.username });
      
      const user = await storage.getUserByUsername(req.body.username);
      if (!user) {
        console.log('User not found:', req.body.username);
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const passwordMatch = await comparePasswords(req.body.password, user.password);
      if (!passwordMatch) {
        console.log('Password mismatch for user:', req.body.username);
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = generateToken(user);
      console.log('Login successful:', { id: user.id, username: user.username });

      res.json({ user, token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Get current user
  app.get("/api/user", authenticateToken, (req, res) => {
    res.json(req.user);
  });

  // Apply authentication middleware to protected routes
  app.use("/api/devices", authenticateToken);
  app.use("/api/user/step", authenticateToken);
  app.use("/api/user/subscription", authenticateToken);
}
