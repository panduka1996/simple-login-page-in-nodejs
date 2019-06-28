
const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');
const session  = require('express-session');

const app = express();

app.use(express.urlencoded({ extended : false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views')); // not must
app.set('view engine', 'pug');

app.use('/', pageRouter);

app.use(session({
	secret: 'secretkey',
	resave: false,
	saveUninitialized:false,
	cookie:{
		maxAge: 68 * 1000 * 30
	}
}));


app.use((req,res,next) => {
 
    var err = new Error('page not found');
    err.status = 404;
    next(err);
});


app.use((err,req,res,next) => {

	res.status(err.status || 500);
	res.send(err.message);

});


app.listen(3000, () =>{

        console.log('server is running op port 3000...');
});

//module.exports = app;