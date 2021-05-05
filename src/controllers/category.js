import models from "../database/models";

const { categories } = models;

class categoriesController {
  static async createCategory(req, res) {
    try {
      const newCategory = {
        name: req.body.name,
      };
      const createdCatgory = await categories.create(newCategory);
      res.status(201).json({
        status: 201,
        message: "new product category created",
        data: createdCatgory,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "server error" });
    }
  }

  static async getCategories(req, res) {
    try {
      const productCategories = await categories.findAll();
      res.status(200).json({
        status: 200,
        message: "all product categories",
        data: productCategories,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "server error" });
    }
  }

  static async updateProductCategory(req, res) {
    try {
      const updateCategory = {
        name: req.body.name,
      };
      const prop = {
        id: req.params.id,
      };
      const updatedCategory = await categories.update(updateCategory, {
        where: prop,
        returning: true,
      });
      res.status(200).json({
        status: 200,
        message: "updated category",
        data: updatedCategory,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "server error" });
    }
  }

  static async deleteProductCategory(req, res) {
    try {
      const modelId = req.params.id;
      const found = await categories.findOne({
        where: { id: modelId },
      });
      if (found) {
        const deleteCategory = await categories.destroy({
          where: { id: modelId },
        });
        return res.status(200).json({
          status: 200,
          message: "deleted category",
          data: deleteCategory,
        });
      }
      res.status(404).json({
        status: 404,
        message: "category not found",
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "server error" });
    }
  }
  static async OneCategory(req, res) {
    try {
      const modelId = req.params.id;
      const singlecategory = await categories.findOne({
        where: { id: modelId },
      });
      res.status(200).json({
        status: 200,
        message: "retrieved category",
        data: singlecategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: "server error" });
    }
  }
}

export default categoriesController;
