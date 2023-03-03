import { Request, Response } from "express";
import { db } from "../db";
import moment from "moment";
import jwt from "jsonwebtoken";
import config from "config";

export const getComments = (req: Request, res: Response) => {
  const query = `SELECT c.*, u.id AS userId, name, profileImg FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC
    `;
  db.query(query, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, config.get("jwt_key"), (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query =
      "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];
    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created");
    });
  });
};