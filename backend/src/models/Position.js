import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Position = sequelize.define("Position", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  code: { type: DataTypes.STRING(20), unique: true, allowNull: false },
  description: { type: DataTypes.TEXT },
  departmentId: {
    type: DataTypes.INTEGER,
    references: { model: "Departments", key: "id" },
  },
  baseSalary: { type: DataTypes.DECIMAL(10, 2) },
  status: { type: DataTypes.ENUM("Active", "Inactive"), allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Position;
