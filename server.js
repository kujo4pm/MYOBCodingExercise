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
		res.setHeader('Content-Type', 'application/json');
		if(err)
		{ 
			if(err.code == 11000)
			{
				// we are here if there is a duplicate key
				// that is - if the payslip has been submitted
				res.end(JSON.stringify({ success: false,
					message: 'Your payslip has already been lodged for this month.' }));
			}
			else
			{
				//otherwise forward the error on
				var message = '';
				for(var x in err.errors)
					message += err.errors[x].message + '\n';
				res.end(JSON.stringify({ success: false,
					message: message }));
			}
		}
		else
		{
			res.end(JSON.stringify({ success: true,
				message: 'Your payslip has been successfully been lodged.' }));
		}
	});
})


app.use('/payslips', payslipRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}/`);
});