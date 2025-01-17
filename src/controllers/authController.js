import { registerUser, loginUser } from "../services/authService.js";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await registerUser(userName, email, password);
    res.status(201).json({ result: user });
  } catch (error) {
    res.status(400).json({
      result: {
        message: error.message,
      },
    });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const token = await loginUser(userName, password);
    res.status(200).json({
      result: {
        message: "Успешный вход",
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      result: {
        message: error.message,
      },
    });
  }
};
