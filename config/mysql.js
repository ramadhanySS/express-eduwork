const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dany1212',
    database: 'eduwork-curds'
});

module.exports = connection;