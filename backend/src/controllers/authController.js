import { registerService } from "../services/authService";

const registerController = async () => {
  try {
    const data = req.body;
    // valida los campos obligatorios requeridos
    if (!data.name || !data.email || !data.password || !data.role) {
      return res
        .status(400)
        .json({
          message: "Por favor, proporcione todos los campos obligatorios",
        });
    }
    const response = await registerService(data);

    
  } catch (error) {}
};

export { register };
