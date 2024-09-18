import jwt from "jsonwebtoken";

export const generateAccesToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "1d" });
};
