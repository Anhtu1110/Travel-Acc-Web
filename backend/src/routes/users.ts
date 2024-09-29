import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

router.post(
  "/register",
  [
    // Kiểm tra trường 'type' trước
    check("type").isIn(["personal", "business"]).withMessage("Invalid type"),

    // Kiểm tra cho Personal từ formData
    check("formData.firstName")
      .if((value, { req }) => req.body.type === "personal")
      .notEmpty()
      .withMessage("First Name is required"),
    check("formData.lastName")
      .if((value, { req }) => req.body.type === "personal")
      .notEmpty()
      .withMessage("Last Name is required"),
    check("formData.email", "Valid email is required").isEmail(),
    check(
      "formData.password",
      "Password must be at least 6 characters long"
    ).isLength({ min: 6 }),
    check("formData.confirmPassword", "Confirm Password is required").custom(
      (value, { req }) => {
        if (value !== req.body.formData.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }
    ),

    // Kiểm tra cho Business từ formData
    check("formData.businessName")
      .if((value, { req }) => req.body.type === "business")
      .notEmpty()
      .withMessage("Business name is required"),
    check("formData.businessPhone")
      .if((value, { req }) => req.body.type === "business")
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Phone number must be at least 10 digits"),
    check("formData.businessPhone")
      .if((value, { req }) => req.body.type === "business")
      .matches(/^\d+$/)
      .withMessage("Phone number must contain only digits"),
    check("formData.businessAddress")
      .if((value, { req }) => req.body.type === "business")
      .notEmpty()
      .withMessage("Business address is required"),
    check("formData.businessRegistrationNumber")
      .if((value, { req }) => req.body.type === "business")
      .notEmpty()
      .withMessage("Registration number is required"),
    check("formData.representativeName")
      .if((value, { req }) => req.body.type === "business")
      .notEmpty()
      .withMessage("Representative name is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({ ...req.body.formData, type: req.body.type });
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
