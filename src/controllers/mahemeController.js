import models from "../database/models";

const { mynames } = models;

class categoriesController {
  static async createName(req, res) {
    try {
      const newName = {
        name: req.body.name,
      };
      const createdName = await mynames.create(newName);
      res.status(201).json({
        status: 201,
        message: "name created",
        data: createdName,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "server error" });
    }
  }

  static async getName(req, res) {
    try {
      const myname = await mynames.findAll();
      res.status(200).json({
        status: 200,
        message: "name",
        data: myname,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: "server error" });
    }
  }

  
  }


export default categoriesController;
