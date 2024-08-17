import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err as undefined);
  }
});

// comparePassword
userSchema.methods.comparePassword = function (password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
};

// generateConfirmationToken
userSchema.methods.generateConfirmationToken = function () {
  const token = CryptoJS.SHA256("token");
  this.confirmationToken = token;

  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;

  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
