import Models from "../database/models";
import bcrypt from "bcryptjs";
import { encode } from "../helpers/jwtTokenizer";
const { users } = Models;

class authController {
  static async signup(req, res) {
    try {
      if (req.user) {
        return res.status(400).json({
          status: 400,
          message: "User with email already exists",
        });
      }
      const { users } = Models;
      const { fullName, email, password, role } = req.body;
      const salt = await bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      await users.create({
        fullName,
        email,
        role,
        password: hashPassword,
      });
      return res.status(201).json({
        status: 201,
        message: "User have been created",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
  static async singin(req, res) {
    const { email, password } = req.body;
    if (!req.user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const databaseEmail = req.user.email;
    const hashPassword = req.user.password;
    const decrePassword = await bcrypt.compare(password, hashPassword);

    console.log(decrePassword);
    if (databaseEmail == email) {
      if (decrePassword) {
        const token = await encode({ email });
        return res.status(200).json({
          status: 200,
          message: "Message",
          data: {
            user: req.user,
            token,
          },
        });
      }
    }
    return res.status(401).json({
      status: 401,
      message: "Password is not correct",
    });
  }
  static async getAllUser(req, res) {
    try {
      const userData = await users.findAll();
      res.status(200).json({
        status: 200,
        message: "all users ",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async OneUser(req, res) {
    try {
      const modelId = req.params.id;
      const singleUser = await users.findOne({
        where: { id: modelId },
      });
      if (singleUser) {
        res.status(200).json({
          status: 200,
          message: "retrieved one user",
          data: singleUser,
        });
      }
      res.status(404).json({
        status: 404,
        message: "user not  found",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, message: error.message });
    }
  }
  static async deleteUser(req, res) {
    try {
      const modelId = req.params.id;
      const found = await users.findOne({
        where: { id: modelId },
      });
      if (found) {
        const deleteUser = await users.destroy({
          where: { id: modelId },
        });
        return res.status(200).json({
          status: 200,
          message: "user deleted ",
          data: deleteUser,
        });
      }
      res.status(404).json({
        status: 404,
        message: "user not found",
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: "server error" + error.message });
    }
  }
}

export default authController;
