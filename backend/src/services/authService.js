import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import { sendEmail } from "./emailService.js";
import { verifyAccount } from "../config/nodemailer/verifyAccount.js";

export const registerService = async (name, email, password,role) => {
  try {

    const userExists = await User.findAll({ where: { email } });
    if(!userExists){
        throw new Error("El correo ya está registrado")
    }

    const salt = await bcrypt.salt(10);

    const passwordHash = await bcrypt.hash(password,salt);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role
    })

    logger.info(`Registro nuevo usuario ${email} de nombre ${name}`);

    const verificationUser = jwt.sign(
      {id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h"}
    );

    const verificationURL = `${process.env.CLIENT_URL}/verificar/${verificationUser}`;

    await sendEmail(
      email,
      "Verifica tu cuenta, Inventario",
      verifyAccount(name, verificationURL)
    )
    return { message: "Usuario registrado correctamente", user: newUser };
  } catch (error) {

  }
};


