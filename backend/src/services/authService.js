import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import { sendEmail } from "./emailService.js";
import { verifyAccount } from "../config/nodemailer/verifyAccount.js";

export const registerService = async ({ name, email, password, role }) => {
  try {
    const userExists = await User.findAll({ where: { email } });
    if (!userExists) {
      throw new Error("El correo ya está registrado");
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

    return { message: "Usuario registrado correctamente", user: newUser };
  } catch (error) {
    throw error;
  }
};

export const loginService = async ({ email, password }) => {
  try {
    const [userExists] = await User.findAll({ where: { email } });

    if (!userExists) {
      throw new Error("Usuario no encontrado");
    }

    console.log(userExists); // Verifica la estructura del objeto

    // Acceder directamente a userExists.password
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      message: "Login correcto",
      token,
      user: {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
      },
    };
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
      throw new Error("Usuario no encontrado");
    }
    if (user.isVerified) {
      throw new Error("Cuenta ya está verificada");
    }
    await sendEmail(
      user.email,
      "Cuenta verificada, Inventario",
      "Tu cuenta ha sido verificada con éxito"
    )
    logger.info(`Usuario ${user.email} verificado`);
    user.isVerified = true;
    await user.save();
    return { message: "Cuenta verificada correctamente" };
  } catch (error) {
    throw error;
  }
};



