const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "us-cdbr-east-02.cleardb.com",
    user: "be221e5e57ae77",
    password: "6f40ffa9",
    database: "heroku_7a3a0efacb4e211"

  });


module.exports = connection;