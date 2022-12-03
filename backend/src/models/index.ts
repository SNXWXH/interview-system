import userModel from "@models/User";
import { DataTypes, Sequelize } from "sequelize";
import { Logger } from "winston";
import Container from "typedi";

import User from "@models/User";
import Score from "./Score";

export default async ( sequelizeInstance :Sequelize) => {
    const userModel = User(sequelizeInstance);
    const scoreModel = Score(sequelizeInstance);
    const logger: Logger = Container.get("logger");

    userModel.hasMany(scoreModel,{
        sourceKey: "id",
        foreignKey:"id",
        onDelete: "cascade",
        onUpdate: "cascade",
    });

    scoreModel.belongsTo(userModel);

    await sequelizeInstance.sync();
}