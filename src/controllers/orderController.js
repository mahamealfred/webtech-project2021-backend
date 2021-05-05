import Models from "../database/models";
const { orders, users } = Models;

class orderController {

    static async add(req, res) {
        try {
            const {
              product,
              quantity,
            
             
            } = req.body;
      const {id } = req.user
      
     
      for (let index = 0; index < req.body.length; index++) {
        const element = req.body[index];
        await orders.create({
          userId: id,
          product:element
        });
        
      }
              return res.status(200).json({
                status: 200,
                message: "New order have been added",
      
              });
         
          } catch (error) {
            console.log(error)
            return res.status(500).json({
              status: 500,
              message: error.message,
            });
          }

    }

    static async deleteOrder(req, res) {
        try {
          const modelId = req.params.id;
          const found = await orders.findOne({
            where: { id: modelId },
          });
          if (found) {
            const deletedOrder = await orders.destroy({
              where: { id: modelId },
            });
            return res.status(200).json({
              status: 200,
              message: "order deleted ",
              data: deletedOrder,
            });
          }
          res.status(404).json({
            status: 404,
            message: "order not found",
          });
        } catch (error) {
          res.status(500).json({ status: 500, message: "server error"+error.message });
        }
      }

      static async getAllOrder(req, res) {
        try {
          const data = await orders.findAll({
            include: [
              {
                model: users,
              },
            ],
          });
   
          return res.status(200).json({
            status: 200,
            message: "Fetchs order succeffuly",
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
export default orderController;
