const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// creat User Model
class User extends Model {}

// define table columns and config
User.init(
    {
        id: {
            // use special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        // table configuration  (https://sequelize.org/v5/manual/models-definition.html#configuration)

        // pass in imported sequelize connection (direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel casing
        underscored: true,
        // make it so our model name stays lowercase
        modelName: 'user'
    }
);

module.exports = User;