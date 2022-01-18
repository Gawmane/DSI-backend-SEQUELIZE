import { sequelize } from "../Config/db.config.js";
import { Sequelize, DataTypes, Model } from "sequelize";


class UserModel extends Model {}



UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    }
}, {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    underscored: true,


})


export default UserModel;