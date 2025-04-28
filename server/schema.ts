import { z } from "zod";

export const users = {
  id: "serial",
  username: "text",
  password: "text",
  email: "text",
  fullName: "text",
  receiveUpdates: "boolean",
  currentStep: "integer",
  trialActive: "boolean",
  trialStartDate: "timestamp",
  trialEndDate: "timestamp",
  paymentAdded: "boolean",
};

export const devices = {
  id: "serial",
  userId: "integer",
  deviceName: "text",
  deviceId: "text",
  firmwareVersion: "text",
  connected: "boolean",
  calibrated: "boolean",
  ceilingHeight: "text",
};

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  fullName: z.string().optional(),
  receiveUpdates: z.boolean().optional(),
});

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertDeviceSchema = z.object({
  userId: z.number().optional(),
  deviceName: z.string().optional(),
  deviceId: z.string(),
  firmwareVersion: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = {
  id: number;
  username: string;
  password: string;
  email: string;
  fullName: string | null;
  receiveUpdates: boolean | null;
  currentStep: number;
  trialActive: boolean;
  trialStartDate: Date;
  trialEndDate: Date;
  paymentAdded: boolean;
};
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
export type Device = {
  id: number;
  userId: number | null;
  deviceName: string | null;
  deviceId: string;
  firmwareVersion: string | null;
  connected: boolean;
  calibrated: boolean;
  ceilingHeight: string | null;
}; 