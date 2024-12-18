module.exports = (sequelize, DataTypes) => {
    // Student will be our database name
    // this will define our model
    // defining our table below
    const Student = sequelize.define('Student', {
        // this will define the columns in our database - give them a name and a data type
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false
            }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })

    // create or update table in the database
    // force = true is an object meaning always update everytime the app restarts
    // console.log optional but will print if database is updated
    Student.sync( { force: true } ).then( () => {
        console.log('Synced student table')
    })

    return Student

}