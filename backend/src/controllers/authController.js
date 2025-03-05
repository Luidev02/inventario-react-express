import {
  loginService,
  logOutService,
  registerService,
} from "../services/authService.js";
import ResponseHandler from "../utils/responseHandler.js";

const registerController = async (req, res) => {
  try {
    const data = req.body;
    // valida los campos obligatorios requeridos
    if (!data.name || !data.email || !data.password || !data.role) {
      return res.status(400).json({
        status: 400,
        message: "Por favor, proporcione todos los campos obligatorios",
      });
    }
    const response = await registerService(data);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json(ResponseHandler.error(error.message, 500));
  }
};

const loginController = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email || !data.password) {
      return res.status(400).json({
        status: 400,
        message: "Por favor, proporcione todos los campos obligatorios",
      });
    }
    const response = await loginService(data);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json(ResponseHandler.error(error.message, 500));
  }
};



const logOutController = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      res.status(400).json({ status: 400, message: "Token no proporcionado" });
    }
    const response = await logOutService(token);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json(ResponseHandler.error(error.message, 500));
  }
};

export { registerController, loginController, logOutController };
