var assert = require('chai').assert;
var should = require('should'); 
var request = require('supertest');  
var url = "http://localhost:3000";
var now;
describe('API', function() {
	before(function(done) {
    // In our tests we use the test db
	now = new Date(); //ensure a new entry
	done();
  });
  it('should correctly insert a new payslip', function(done){
  	
	var body = {firstname: "Kurt", lastname: "Johansen" + now, annualSalary: "12000", superRate: "12", yearMonth: "20166"};
	request(url)
		.put('/payslips')
		.send(body)
		.expect('Content-Type', /json/)
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			should.exist(res.body.success);
	        res.body.success.should.equal(true);
			done();
		});
	});
   	it('should not allow a repeat payslip for same person on the same year and month', function(done){
  	
	var body = {firstname: "Kurt", lastname: "Johansen" + now, annualSalary: "12000", superRate: "12", yearMonth: "20166"};
	request(url)
		.put('/payslips')
		.send(body)
		.expect('Content-Type', /json/)
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			should.exist(res.body.success);
	        res.body.success.should.equal(false);
	        should.exist(res.body.message);
	        res.body.message.should.equal('Your payslip has already been lodged for this month.');
			done();
		});
	});
	 it('should not allow a fields missing', function(done){
  	
	var body = {firstname: "Kurt", lastname: "Johansen" + now, annualSalary: "12000", superRate: "12"};
	request(url)
		.put('/payslips')
		.send(body)
		.expect('Content-Type', /json/)
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			should.exist(res.body.success);
	        res.body.success.should.equal(false);
	        should.exist(res.body.message);
	        res.body.message.should.equal('This payslip was submitted without a month and date\n');
			done();
		});
	});
});