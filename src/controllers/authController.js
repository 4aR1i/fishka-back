import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/authService.js";
import { generateAccesToken } from "../utils/tokens.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await registerUser(name, email, password);
    res.status(201).json({ message: "Пользователь успешно зарегестрирован" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await loginUser(name, password);

    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ id: user.id, name: user.name, token: user.accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const token = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "Рефреш-токен не найден" });
  }

  jwt.verify(refreshToken, process.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Неверный рефреш-токен" });
    }

    const accessToken = generateAccesToken(user);
    res.json({ accessToken });
  });
};

export const logout = (_, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Пользователь вышел из системы" });
};
