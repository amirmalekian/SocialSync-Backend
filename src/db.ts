import mysql from "mysql";
import config from "config";

export const db = mysql.createConnection({
  host: config.get("DB.HOST"),
  user: config.get("DB.USER"),
  password: config.get("DB.PWD"),
  database: config.get("DB.NAME"),
});
