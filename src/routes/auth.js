import express from "express";
import { register, login, token, logout } from "../controllers/authController.js";

const router = express.Router();

// Регистрация пользователя
router.post("/register", register);

// Login пользователя
router.post("/login", login);

// Генерация нового токена
router.post("/token", token);

// Logout пользователя
router.post("/logout", logout);

export default router;
