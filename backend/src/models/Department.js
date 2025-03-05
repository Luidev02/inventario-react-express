import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Department = sequelize.define("Department", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
  name: { type: DataTypes.STRING(100), allowNull: false },
  code: { type: DataTypes.STRING(20), unique: true, allowNull: false },
  location: { type: DataTypes.STRING(100) },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM("Active", "Inactive"), allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Department;
