import { z } from "zod";

// Form Sign In validation schema
export const formSignIn = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type formSignInType = z.infer<typeof formSignIn>;

// Form Register Personal validation schema
export const formRegisterPersonal = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to confirmPassword field for error reporting
  });

export type formRegisterPersonalType = z.infer<typeof formRegisterPersonal>;

// Form Register Business validation schema
export const formRegisterBusiness = z
  .object({
    businessName: z.string().min(1, "Business name is required"), // Business Name
    email: z.string().email("Invalid business email address"), // Business Email
    password: z.string().min(6, "Password must be at least 6 characters long"), // Password
    confirmPassword: z.string().min(1, "Confirm Password is required"), // Confirm Password
    businessPhone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"), // Business Phone
    businessAddress: z.string().min(1, "Business address is required"), // Business Address
    businessRegistrationNumber: z
      .string()
      .min(1, "Registration number is required"), // Business Registration Number
    website: z.string().optional(), // Website (optional)
    representativeName: z.string().min(1, "Representative name is required"), // Representative Name
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to confirmPassword field for error reporting
  });

export type formRegisterBusinessType = z.infer<typeof formRegisterBusiness>;
