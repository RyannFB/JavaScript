const mysql = require('mysql');
const dbConfig = require('../config/databaseConfig');

const connection = mysql.createConnection(dbConfig);

function getUserById(userId, callback) {
    connection.query('SELECT * FROM users WHERE id = ?', [id], (error,results) => {
        if (error) return callback(error);
        callback(null,results[0]);
    
    });
}

module.exports = { getUserById };