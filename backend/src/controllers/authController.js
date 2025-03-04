import { loginService, registerService } from "../services/authService.js";

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

    res.status(200).json({ status: 200, response });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
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
    res.status(200).json({ status: 200, response });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { registerController, loginController };
