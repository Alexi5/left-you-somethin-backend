const Sequelize = require('sequelize');

// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/leftyousomethin', {
//     logging: false
// });

// const db = new Sequelize('leftyousomethin', 'hatch', 'hatch', {dialect: 'postgres', port: 5432, logging:true});

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/leftyousomethin');

db.authenticate()
    .then(function(err) {
        console.log('Database connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = db;