import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ENV from "#env";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "username already taken"],
      required: true,
    },

    email: {
      type: String,
      unique: [true, "Account already exists with this email address"],
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, ENV.JWT_SECRET, {
    expiresIn: ENV.expiresIn,
  });
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
