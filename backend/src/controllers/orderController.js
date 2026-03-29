import sendEmail from "../../utils/sendEmail.js";
import orderModel from "../models/orderModel.js";
import product from "../models/productsModel.js";

export const getOrder = async (req, res) => {
  try {
    const listorder = await orderModel.find().sort({ createdAt: -1 });
    res.json({ listorder });
  } catch (error) {
    res.status(400).json({ message: "danh sách bị lỗi" });
  }
};

export const addOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
      shippingFee,
    } = req.body;

    const newOrder = {
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
      shippingFee,
    };

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "giỏ hàng trống" });
    }
    if (!shippingAddress || !shippingAddress.phone) {
      return res.status(400).json({ message: "thiếu thông tin khách hàng" });
    }

    if (!totalPrice) {
      return res.status(400).json({ message: "không có tổng tiền" });
    }

    const validpayment = ["paypal", "bank", "cod"];
    if (!validpayment.includes(paymentMethod)) {
      return res
        .status(400)
        .json({ message: "phương thúc thanh toán không hợp lệ" });
    }

    if (shippingAddress.emailAddress) {
      await sendEmail(shippingAddress.emailAddress, newOrder);
    }

    for (const item of orderItems) {
      const products = await product.findById(item.product);

      if (!products) {
        return res.status(404).json({ message: "không tìm thấy sản phẩm" });
      }

      if (products.isSold || products.countInStock <= 0) {
        return res.status(400).json({
          message: `Sản phẩm ${products.name} đã hết hàng`,
        });
      }
      products.countInStock = products.countInStock - 1; // giảm
      products.isSold = true; // vì bạn bán 1 cái

      await products.save();
    }

    await orderModel.create(newOrder);

    res
      .status(201)
      .json({ message: "thêm đơn đặt hàng thành công", order: newOrder });
  } catch (error) {
    res
      .status(400)
      .json({ message: "thêm đơn đặt hàng thất bại", error: error.message });
  }
};

export const getSumOrder = async (req, res) => {
  try {
    const order = await orderModel.find();
    const totalRevenus = order.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    );

    const totalItem = order.reduce((sum, order) => {
      return sum + order.orderItems.reduce((s, item) => s + item.qty, 0);
    }, 0);

    res.json({ totalRevenus, totalItem, totalOrder: order.length });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "bị lỗi tổng hoá đơn" });
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

export const updateStatus = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
      res.json(order),
    );
  } catch (error) {
    res.status(400).json({ message: " bị lỗi" });
  }
};
