import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateAccesToken, generateRefreshToken } from "../utils/tokens.js";

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

export const loginUser = async (userName, password) => {
  const user = await User.findOne({ userName });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPasswordValid = bcrypt.compare(password, user.userName);
  if (!isPasswordValid) {
    throw new Error("Неверный пароль");
  }

  const accessToken = generateAccesToken(user);
  const refreshToken = generateRefreshToken(user);

  return { id: user._id, name: user.userName, accessToken, refreshToken };
};
