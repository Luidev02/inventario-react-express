import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const Connection_History = sequelize.define("Connection_History", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM("valid", "invalid"),
    defaultValue: "valid",
  },
  last_connection:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Connection_History;
