import { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export default (app: Application, express: any) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
