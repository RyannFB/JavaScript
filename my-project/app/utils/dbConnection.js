const mysql = require('mysql');

function getDbConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'mydatabase'
    });
}

module.exports = { getDbConnection };