const { Sequelize, DataTypes } = require("sequelize")

const configJson = require("../config.json")

const createStudentModel = require('./student.js')

// env = environment
// look for an environment variable (will be called NODE_ENV) and read it's value
// environment variables are set for your whole computer (or for a server)
// any application running on this computer or server can read these environment variables
// at azure, we will create an environment variable for your server called NODE_ENV and set it to "production"
// if there is no NODE_ENV set, like on your computer, we'll use the value 'development'
const env = process.env.NODE_ENV || "development"

const config = configJson[env] // read the DB configuration object for 'development' or 'production'

const sequelize = new Sequelize(config)

const database = {
//initialize sequelize twice
    //one in lowercase and one in uppercase
    sequelize: sequelize,
    Sequelize: Sequelize,
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name // 'Student'
database[studentModelName] = studentModel

module.exports = database
