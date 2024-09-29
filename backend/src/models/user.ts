import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["personal", "business"],
    required: true,
  },
  // Các trường của personal
  firstName: String,
  lastName: String,
  // Các trường của business
  businessName: String,
  businessPhone: String,
  businessAddress: String,
  businessRegistrationNumber: String,
  representativeName: String,
  // Trường chung
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  if (this.type === "personal") {
    if (!this.firstName || !this.lastName) {
      return next(
        new Error("First name and Last name are required for personal users")
      );
    }
  }

  if (this.type === "business") {
    if (
      !this.businessName ||
      !this.businessPhone ||
      !this.businessAddress ||
      !this.businessRegistrationNumber ||
      !this.representativeName
    ) {
      return next(
        new Error("All business fields are required for business users")
      );
    }
  }

  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
