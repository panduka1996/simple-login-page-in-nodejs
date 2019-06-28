
const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({

     connectionLimit:10,
     host:'localhost',
     user:'root',
     password:'',
     database:'www'
});

pool.getConnection((err,connection) => {

	if(err)
		console.error('something went wrong in database connection');

	if(connection)
		connection.release();
	return;
});


pool.query = util.promisify(pool.query);

module.exports = pool;