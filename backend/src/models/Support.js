import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Support = sequelize.define('Support', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT },
    userId: { type: DataTypes.UUID, references: { model: 'Users', key: 'id' } },
    inventoryId: { type: DataTypes.UUID, references: { model: 'Inventories', key: 'id' } },
    status: { type: DataTypes.ENUM('Open', 'In progress', 'Closed'), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Support;