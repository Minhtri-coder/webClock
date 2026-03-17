import orderModel from "../models/orderModel.js";

export const getOrder = async (req, res) => {
  try {
    const listorder = await orderModel.find();

    res.json({ listorder });
    res.status(200).json({ message: "danh sách đơn hàng" });
  } catch (error) {
    res.status(400).json({ message: "danh sách bị lỗi" });
  }
};

export const addOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    const newOrder = {
      orderItems,
      user: req.user.id,
      shippingAddress,
      totalPrice,
    };

    await orderModel.create(newOrder);
    res.status(201).json({ message: "thêm đơn đặt hàng thành công" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "thêm đơn đặt hàng thất bại", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");
    if (!order) {
      return res.status(404).json({ message: "không tìm thấy đơn hàng" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
