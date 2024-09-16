import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Регистрация пользователя
router.post("/register", register);

// Login пользователя
router.post("/login", login);

export default router;
