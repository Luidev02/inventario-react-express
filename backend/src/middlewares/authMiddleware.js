import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Connection_History from "../models/Connection_History.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Acceso denegado. No hay token" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Acceso denegado. Token inválido" });
    }
    const History = await Connection_History.findOne({
      where: { token, user_id: user.dataValues.id },
    });
    if (!History) {
      return res
        .status(401)
        .json({ error: "Acceso denegado. No se ha conectado recientemente" });
    } else {
      await History.update({ last_connection: new Date() });
    }
    req.user = user.dataValues;
    next();
  } catch (error) {
    res.status(401).json({ error: "Acceso denegado. Token inválido" });
  }
};
