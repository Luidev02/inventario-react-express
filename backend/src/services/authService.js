import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import { sendEmail } from "./emailService.js";
import { verifyAccount } from "../config/nodemailer/verifyAccount.js";
import ResponseHandler from "../utils/responseHandler.js";
import Connection_History from "../models/Connection_History.js";

export const registerService = async ({ name, email, password, role }) => {
  try {
    const userExists = await User.findAll({ where: { email } });
    if (!userExists) {
      return ResponseHandler.error("El correo ya está registrado",400);
    }

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    logger.info(`Registro nuevo usuario ${email} de nombre ${name}`);

    const verificationUser = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const verificationURL = `${process.env.CLIENT_URL}/verificar/${verificationUser}`;

    await sendEmail(
      email,
      "Verifica tu cuenta, Inventario",
      verifyAccount(name, verificationURL)
    );

    return ResponseHandler.success({},"Registro exitoso. Verifica tu correo electrónico para activar tu cuenta");
  } catch (error) {
    throw error;
  }
};

export const loginService = async ({ email, password,ip }) => {
  try {
    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return ResponseHandler.error("Usuario no encontrado", 404);
    }

    // Convertir el objeto Sequelize a un objeto plano sin metadatos
    const user = userExists.get({ plain: true });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ResponseHandler.error("Contraseña incorrecta", 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
     await Connection_History.create({
      user_id: user.id,
      ip: ip,
      token: token,
    })
    return ResponseHandler.success(
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Login correcto"
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyAccountService = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return ResponseHandler.error("Usuario no encontrado", 404);
    }
    if (user.isVerified) {
      return ResponseHandler.error("Cuenta ya está verificada", 400);
    }
    await sendEmail(
      user.email,
      "Cuenta verificada, Inventario",
      "Tu cuenta ha sido verificada con éxito"
    );
    logger.info(`Usuario ${user.email} verificado`);
    user.isVerified = true;
    await user.save();
    return ResponseHandler.success({}, "Cuenta verificada correctamente");
  } catch (error) {
    throw error;
  }
};

export const logOutService = async (token) => {
  try {
    
    const logOut = await Connection_History.findOne({ where: { token } });
    if (!logOut) {
      return ResponseHandler.error("Token no encontrado", 404);
    }
    logOut.status = "invalid";
    await logOut.save();
    return ResponseHandler.success({}, "Logout correcto");
  } catch (error) {
    throw error;
  }
}
