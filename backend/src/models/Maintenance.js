import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Maintenance = sequelize.define('Maintenance', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    inventoryId: { type: DataTypes.UUID, references: { model: 'Inventories', key: 'id' } },
    maintenanceType: { type: DataTypes.STRING(50) },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
    responsibleId: { type: DataTypes.UUID, references: { model: 'Users', key: 'id' } },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('Pending', 'In progress', 'Completed'), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

export default Maintenance;