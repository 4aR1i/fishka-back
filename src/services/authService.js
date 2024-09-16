import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const registerUser = async (userName, email, password) => {
  if (await User.findOne({ userName })) {
    throw new Error("Login занят");
  }

  if (await User.findOne({ email })) {
    throw new Error("Пользователь с такой почтой уже существует");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({ userName, email, passwordHash });
  await user.save();

  return user;
};

const jwtSecret = process.env.JWT_SECRET;

export const loginUser = async (userName, password) => {
  const user = await User.findOne({ userName });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPasswordValid = bcrypt.compare(password, user.userName);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
  }

  const token = jwt.sign({ id: user._id, userName: user.userName }, jwtSecret, { expiresIn: "2h" });

  return { id: user._id, name: user.userName, token };
};
