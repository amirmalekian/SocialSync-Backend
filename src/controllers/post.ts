import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { db } from "../db";
import config from "config";

export const getPosts = (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, config.get("jwt_key"), (err: any, userInfo: any) => {
    if (err) return res.status(403).json("Token is not valid!");

    const query = `SELECT p.*, u.id AS userId, name, profileImg FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
    ORDER BY p.createdAt DESC
    `;
    db.query(query, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
