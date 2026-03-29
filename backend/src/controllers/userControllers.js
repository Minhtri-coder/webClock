import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const getListUser = await userModel.find();
    if (!getListUser) {
      res
        .status(400)
        .json({ status: "không có tài khoản", message: "thất bại" });
    }
    res.status(200).json(getListUser);
  } catch (error) {
    res.status(400).json({ message: "bị lỗi" });
  }
};

export const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

    if (user.role !== "admin") {
      return res.status(403).json({ message: "truy cập bị từ chối" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "dong_ho_ky", {
      expiresIn: "1d",
    });

    return res.status(200).json({
      status: "Đăng nhập thành công",
      message: "thành công",
      token: token,
      adminName: user.name,
    });
  } catch (error) {
    return res.status(400).json({ message: "bị lỗi" });
  }
};

export const postRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    const findUser = await userModel.findOne({ email });
    if (findUser) {
      res.status(400).json({
        status: "tài khoản email đã tồn t",
        message: "thất bại",
      });
    }
    const newUser = {
      name,
      email,
      password,
      phone,
      address,
      role: "user",
    };
    await userModel.create(newUser);
    res
      .status(200)
      .json({ status: "Đăng ký thành công", message: "thành công" });
  } catch (error) {
    res.status(400).json({ message: "bị lỗi" });
  }
};
