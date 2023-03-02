import { Request, Response } from "express";
import { db } from "../db";

export const getUser = (req: Request, res: Response) => {
  const userId = req.params?.userId;
  const query = `SELECT * FROM users WHERE id = ?`;
  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};
