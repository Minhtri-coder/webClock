import categoryModel from "../models/categoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const getListCategory = await categoryModel.find();
    res.status(200).json(getListCategory);
  } catch (error) {
    res.status(400).json({ message: "bị lỗi" });
  }
};

export const postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = { name };

    await categoryModel.create(newCategory);
    res
      .status(200)
      .json({ status: "thành công", message: "thêm danh mục thành công" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "thành công", message: "thêm danh mục thành công" });
  }
};
