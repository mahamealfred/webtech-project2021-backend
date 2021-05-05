import Models from "../database/models";
const { categories, products } = Models;
class productsController {
  static async add(req, res) {
    try {
      const {
        name,
        categoryId,
        price,
        quantity,
        description,
        imageUrl,
      } = req.body;

      const found = await categories.findOne({
        where: { id: categoryId },
      });
      if (found) {
        await products.create({
          name,
          categoryId,
          price,
          quantity,
          imageUrl,
          description,
        });
        return res.status(200).json({
          status: 200,
          message: "New product have been added",

        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Category not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const {
        name,
        categoryId,
        price,
        quantity,
        description,
        imageUrl,
      } = req.body;
      const { id } = req.params;
      const found = await products.findOne({
        where: { id },
      });
      if (found) {
		const category = await categories.findOne({
			where: { id: categoryId },
		  });
console.log(category)
		  if(category){
			const updatedProduct = await products.update(
				{
				  name,
				  categoryId,
				  price,
				  quantity,
				  imageUrl,
				  description,
				},
				{ where: { id },
				returning: true, },
				
			  );
	  
			return  res.status(200).json({
				status: 200,
				message: "Product updated",
			  
				data:updatedProduct, 
			  });
		  }
		  else{
		return	res.status(400).json({
				status: 400,
				message: "Please provide valid category Id",
			  }); 
		  }
     
      }
      res.status(404).json({
        status: 404,
        message: "product not found",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: "server error" });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const modelId = req.params.id;
      const found = await products.findOne({
        where: { id: modelId },
      });
      if (found) {
        const deleteProduct = await products.destroy({
          where: { id: modelId },
        });
        return res.status(200).json({
          status: 200,
          message: "product deleted ",
          data: deleteProduct,
        });
      }
      res.status(404).json({
        status: 404,
        message: "product not found",
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "server error" });
    }
  }
  static async OneProduct(req, res) {
    try {
      const modelId = req.params.id;
      const singleproduct = await products.findOne({
        where: { id: modelId },
      });
      if(singleproduct )
      {
        res.status(200).json({
          status: 200,
          message: "retrieved one product",
          data: singleproduct,
        });
      }
      res.status(404).json({
        status: 404,
        message: "product not  found",
      });
     
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: "server error" });
    }
  }

  static async get(req, res) {
    try {
      const data = await products.findAll({
        include: [
          {
            model: categories,
          },
        ],
      });

      return res.status(200).json({
        status: 200,
        message: "Fetchs products succeffuly",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

export default productsController;
