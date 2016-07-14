var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var payslipRouter = express.Router();

payslipRouter.use(bodyParser.json());

payslipRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.post(function(req, res, next){
    console.log(req.body);
    res.end('Received payslip from ' + req.body.firstname + ' ' + req.body.lastname );    
})

app.use('/payslips', payslipRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});