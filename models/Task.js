const { Model, UUIDV4 } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here 
    }
    }
    Task.init (
        {
            uuid: {
                type: DataTypes.UUIDV4,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                primaryKey: true,
                defaultValue: UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true
                },
                defaultValue: false
            },
        },
        {
            sequelize,
            modelName: "Task"
        }
    )
    return Task
}   