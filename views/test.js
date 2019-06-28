
const express = require('express');
const User  = require('../core/user');
const router = express.Router();
const session  = require('express-session');


const user = new User();

router.get('/', (req,res,next) => {

     let user = req.session.user;

     if(user){
        res.redirect('/home');
        return;
     }
     res.render('index',{title:"my applicaion"});
});

router.get('/home', (req,res,next) => {

      let user = req.session.user;

      if (user) {
        res.render('home',{opp:req.session.opp, name:user.fullname});
        return;
      }
      res.redirect('/');
});


router.post('/login', (req,res,next) => {

    user.login(req.body.username,req.body.password,function(result){

    	if(result){
              req.session.user = result;
              req.session.opp = 1;

              res.redirect('/home');
    	
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

          user.find(lastId, function(result){

            req.session.user = result;
            req.session.opp = 0;
            res.redirect('/home');
          });
        }
    	else{
    		cosole.log('error creating a new user...');
    	}
    });
});


module.exports = router;