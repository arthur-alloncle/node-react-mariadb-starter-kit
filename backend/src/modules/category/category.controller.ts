import { User } from "../../models/User";
import { Category } from "../../models/Category";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface IGetUserAuthInfoRequest extends Request {
  user?: { id: string; role: string }; // or any other type
}

export const create = async (req: IGetUserAuthInfoRequest, res: Response) => {
    console.log(req.user);
    
  try {
    const { name, display_name } = req.body;

    // Get current user to check its role
    const loggedUser = User.findOne({where: {id: req.user?.id}})

    if (!loggedUser && loggedUser !== "admin") {
      return res
        .status(401)
        .json({ message: "Should be logged in as administrator" });
    }

    const category = await Category.create({
      id: uuidv4(),
      name,
      display_name,
    });

    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      attributes: ["name", "display_name", "id"],
    });

    return res.json(categories)
  } catch (error) {
    console.error(error);
  }
};
