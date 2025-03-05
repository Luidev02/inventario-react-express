import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Inventory = sequelize.define('Inventory', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    code: { type: DataTypes.STRING(20), unique: true, allowNull: false },
    category: { type: DataTypes.STRING(50) },
    location: { type: DataTypes.STRING(100) },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitValue: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    acquisitionDate: { type: DataTypes.DATE },
    status: { type: DataTypes.ENUM('Active', 'Inactive', 'Under maintenance'), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Inventory;