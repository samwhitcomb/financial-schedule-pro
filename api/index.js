import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const scryptAsync = promisify(scrypt);

// In-memory storage
const users = new Map();
let currentUserId = 1;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Helper functions
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id,
      username: user.username,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ message: "Invalid token" });
      }

      const dbUser = users.get(user.id);
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

// Routes
app.post("/api/register", async (req, res) => {
  try {
    console.log('Registration request received:', { username: req.body.username, email: req.body.email });
    
    // Check if username exists
    const existingUser = Array.from(users.values()).find(u => u.username === req.body.username);
    if (existingUser) {
      console.log('Username already exists:', req.body.username);
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email exists
    const emailUser = Array.from(users.values()).find(u => u.email === req.body.email);
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

    const user = {
      id: currentUserId++,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      fullName: req.body.fullName || null,
      receiveUpdates: req.body.receiveUpdates || null,
      currentStep: 1,
      trialActive: true,
      trialStartDate: now,
      trialEndDate: trialEndDate,
      paymentAdded: false,
    };

    users.set(user.id, user);
    console.log('User created successfully:', { id: user.id, username: user.username });

    const token = generateToken(user);
    console.log('Token generated successfully');

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    console.log('Login attempt:', { username: req.body.username });
    
    const user = Array.from(users.values()).find(u => u.username === req.body.username);
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
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/user", authenticateToken, (req, res) => {
  res.json(req.user);
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error('Error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
});

export default app; 