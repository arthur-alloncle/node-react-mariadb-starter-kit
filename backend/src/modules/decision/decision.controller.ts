// routes/decision.ts
import { Request, Response } from "express";
import { Decision } from "../../models/Decision";
import { Category } from "../../models/Category";
import { v4 as uuidv4 } from "uuid";

interface IGetUserAuthInfoRequest extends Request {
  user?: {id: string} // or any other type
}

export const create = async (req: IGetUserAuthInfoRequest, res: Response) => {
    
  try {
    const { title, category_id, outcome, importance, confidence } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    // 1. Vérifier catégorie existe
    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    // 2. Création décision
    const decision = await Decision.create({
      id: uuidv4(),
      title,
      outcome,
      importance,
      confidence,
      user_id: userId,
      category_id,
    });

    return res.status(201).json(decision);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const list = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.user?.id;
  if(!userId) {
    return res.status(401).json({message: "Non authentifié"})
  }
  const decisions = await Decision.findAll({where: {user_id: userId}})

  return res.json(decisions);
}