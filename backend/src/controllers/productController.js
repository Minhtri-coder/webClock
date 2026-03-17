import Product from "../models/productsModel.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi khi gọi lấy danh sách sản phẩm", error);
    res.status(400).json({ message: "lỗi hệ thống" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      brand,
      category,
      movement,
      caseSize,
      material,
      year,
      strap,
      description,
      countInStock,
      isSold,
    } = req.body;
    const newProduct = {
      name,
      price,
      image,
      brand,
      category,
      movement,
      caseSize,
      material,
      year,
      strap,
      description,
      countInStock,
      isSold,
    };
    await Product.create(newProduct);
    res.status(200).json({ message: "thêm sản phẩm thành công" });
  } catch (error) {
    res.status(400).json({ message: "thêm sản phẩm thất bại" });
  }
};

export const productDetails = async (req, res) => {
  try {
    const onlyProduct = await Product.findById(req.params.id);
    res.status(200).json({
      status: "thành công",
      message: "sản phẩm chi tiết",
      data: onlyProduct,
    });
  } catch (error) {
    res.status(400).json({ message: "bị lỗi" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      brand,
      category,
      movement,
      caseSize,
      material,
      year,
      strap,
      description,
      countInStock,
      isSold,
    } = req.body;
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        image,
        brand,
        category,
        movement,
        caseSize,
        material,
        year,
        strap,
        description,
        countInStock,
        isSold,
      },
      { new: true },
    );
    if (!updateProduct) {
      res.status(400).json({ message: "không cập nhập được sản phẩm" });
    }
    res.status(200).json({ message: " cập nhập được sản phẩm thành công" });
  } catch (error) {
    res.status(400).json({ message: "bị lỗi" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      res.status(400).json({ message: "không xoá được sản phẩm" });
    }
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(400).json({ message: "bị lỗi" });
  }
};
