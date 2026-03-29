import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  console.log("HEADERS:", req.headers);

  let token;

  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  console.log("TOKEN AFTER SPLIT:", token);

  if (!token) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
  }

  try {
    const decoded = jwt.verify(token, "dong_ho_ky");
    console.log("DECODED:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" });
  }
};
