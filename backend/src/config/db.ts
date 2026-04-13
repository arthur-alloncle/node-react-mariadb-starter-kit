// import mysql from "mysql2/promise";

// export const db = mysql.createPool({
//     host: "db",
//     user: "root",
//     password: "root",
//     database: "app"
// });

// config/database.ts
// import { Sequelize } from "sequelize";


// export const sequelize = new Sequelize(process.env.DATABASE_URL ? process.env.DATABASE_URL : '' )
// export const sequelize = new Sequelize(process.env.DATABASE_URL ? process.env.DATABASE_URL : '' )

// npx sequelize-cli model:generate --name Decision --attributes id:string,outcome:integer,importance:integer,confidence:float,title:string,user_id:uuid,category:uuid
// npx sequelize-cli model:generate --name User --attributes id:string,first_name:string,last_name:string,email:string,password:string,role:string,date_of_birth:date
// npx sequelize-cli model:generate --name Category --attributes id:string,name:string,display_name:string

import "reflect-metadata";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Decision } from "../models/Decision"
import { Category } from "../models/Category";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: "db", // ⚠️ docker
  username: "root",
  password: "root",
  database: "app_db",
  models: [User, Decision, Category],
  logging: false,
});