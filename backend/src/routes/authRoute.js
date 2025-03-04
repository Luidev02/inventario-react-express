import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const auth = Router();

auth.post("/register", registerController);

auth.post("/login", loginController);

export default auth;
