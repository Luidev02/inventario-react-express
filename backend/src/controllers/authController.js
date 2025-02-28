import { registerService } from "../services/authService.js";

const registerController = async (req,res) => {
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

    res.status(200).json({status: 200, response})
    
  } catch (error) {
    res.status(500).json({status: 500, message: error.message})
  }
};

export { registerController };
