
const express = require('express');
const User  = require('../core/user');
const router = express.Router();
const session  = require('express-session');


const user = new User();

router.get('/', (req,res,next) => {

     res.render('../views/index');
});

router.get('/home', (req,res,next) => {

      res.send('this is the home page');
});


router.post('/login', (req,res,next) => {

    user.login(req.body.username,req.body.password,function(result){

        if(result){
              
              res.render('../views/home');
        
        }
        else{
            res.send('username/password incorrect');   
        }
    });
});

router.post('/register', (req,res,next) => {

    let userInput = {
              username: req.body.username,
              fullname: req.body.fullname,
              password: req.body.password
    };



    user.create(userInput,function(lastId){

        if(lastId){

          res.send('welcome: '+userInput.username);
        }
        else{
            cosole.log('error creating a new user...');
        }
    });
});


module.exports = router; // not must