
const pool = require('./pool');
const bcrypt  = require('bcrypt');

function User() {};

User.prototype = {
 
    find : function(user = null,callback)
    {

    	if(user)
    		var field  = Number.isInteger(user) ? 'id' : 'username';

    	var sql  = `SELECT * FROM users WHERE ${field} = ? `;

    	pool.query(sql,user, function(err,result){
                  
                  if(result.length){
                    return callback(result[0]);
                  }
    	});
    },

    create : function(body, callback)
    {

    	var pwd  = body.password;
    	body.password = bcrypt.hashSync(pwd,10);

    	var bind = [];

    	for(prop in body){
    		bind.push(body[prop]);
    	}

    	

    	var sql = 'INSERT INTO users(username,fullname,password) VALUES (?,?,?)';

    	pool.query(sql,bind,function(err,lastId){

    		if(err){
                    throw err;
                   }

           return callback(lastId);
    	});
    },

    login : function(username,password,callback){

    	this.find(username,function(user){
    		
    		if(user){
                 if(bcrypt.compareSync(password,user.password)){
                 	return callback(user);
                 	
                 }
    		}

    		return callback(null);
    	});
    }

}

module.exports = User;