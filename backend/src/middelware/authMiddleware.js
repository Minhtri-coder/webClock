import jwt from "jsonwebtoken";

// 1. Kiểm tra xem người dùng có đăng nhập chưa
export const isAuth = (req, res, next) => {
  // SỬA TẠI ĐÂY: Dùng 'let' thay vì 'const' để có thể gán lại giá trị
  let token = req.headers.token || req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    // Bây giờ việc gán lại giá trị này sẽ không còn bị lỗi nữa
    token = token.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Bạn chưa đăng nhập! Hãy trình vé." });
  }

  try {
    // Giải mã token bằng chìa khóa bí mật
    const decoded = jwt.verify(token, "DONG_HO_KY");

    // Lưu thông tin vào req.user (Lưu ý: object này sẽ có trường .id như bạn đã sign lúc Login)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Vé không hợp lệ hoặc đã hết hạn" });
  }
};

// 2. Kiểm tra admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Lỗi! Bạn không phải Admin, không được vào đây." });
  }
};
