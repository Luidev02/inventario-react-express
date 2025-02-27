import app from "./app.js";
import { sequelize } from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos OK.");

    const server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto :${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
};

startServer();
