const mysql = require('mysql2');

const config = require('../config/config.json');

var pool

createconn()
function createconn(){
  pool=mysql.createPool(process.env.DATABASE)
  pool.on('error', createconn)
}


module.exports = pool.promise();
