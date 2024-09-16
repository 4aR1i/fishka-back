import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Autorization")?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ result: { message: "Нет токена, доступ запрещен" } });
  }

  try {
    const decoded = jwt.verify(token, process.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ result: { message: "Неверный токен" } });
  }
};
