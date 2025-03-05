import { Router } from "express";
import {
  loginController,
  logOutController,
  registerController,
} from "../controllers/authController.js";

const auth = Router();

auth.post("/register", registerController);

auth.post("/login", loginController);

auth.get("/logout", logOutController)

export default auth;
