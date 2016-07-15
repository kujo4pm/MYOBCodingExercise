var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dateformat = require('dateformat');

var url = 'mongodb://localhost:27017/myobSlips';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});




var Payslips = require('./models/payslips');

var hostname = 'localhost';
var port = 3000;


var app = express();

// logging
app.use(morgan('dev'));

// included the router within the server
// as it seemed a little excessive 
// to flesh out a whole RESTful API
// just for a single post - but here
// is a demonstration of purpose
var payslipRouter = express.Router();

payslipRouter.use(bodyParser.json());

payslipRouter.route('/')
.post(function(req, res, next){
    console.log(req.body);
    Payslips.create(req.body, function(err, slip){
    		if(err) throw err;
	    	var id = slip._id;
	    	res.setHeader('Content-Type', 'application/json');
		    res.send(JSON.stringify({ success: true,
		    message: 'your payslip has been added' }));
		    res.end('Received payslip from ' + req.body.firstname + ' ' + req.body.lastname );    
	    });
})

app.use('/payslips', payslipRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});