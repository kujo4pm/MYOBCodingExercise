var assert = require('chai').assert;
var payslip = require('../public/js/busLogic');
describe('Business Logic', function() {
	describe('Gross Income', function() {
		it('should return $10,000 when an annual salary of $120,000', function() {
			assert.equal(10000, payslip.getGrossIncome(120000));
		});
		it('should return 0 for an annual salary of $0', function() {
			assert.equal(0, payslip.getGrossIncome(0));
		});
		it('should return NaN for an annual salary of \'$120,000\'', function() {
			assert.isNaN(payslip.getGrossIncome('$1999'));
		});
	});
	describe('Income Tax', function() {
		it('should return $0 when an annual salary of $0 in 2016', function() {
			assert.equal(0, payslip.getIncomeTax(2016, 0));
		});
		it('should return $5,296 when an annual salary of $200,000 in 2016', function() {
			assert.equal(5296, payslip.getIncomeTax(2016, 200000));
		});
		it('should return $3,621 when an annual salary of $150,000 in 2016', function() {
			assert.equal(3621, payslip.getIncomeTax(2016, 150000));
		});
		it('should return $1,110 when an annual salary of $67,000 in 2016', function() {
			assert.equal(1110, payslip.getIncomeTax(2016, 67000));
		});
		it('should return $29 when an annual salary of $20,000 in 2016', function() {
			assert.equal(29, payslip.getIncomeTax(2016, 20000));
		});
		it('should return $0 when an annual salary of -$20,000 in 2016', function() {
			assert.equal(0, payslip.getIncomeTax(2016, -20000));
		});
	});
	describe('Net Income', function() {
		it('should return $0 when an annual salary of $0 in 2016', function() {
			assert.equal(0, payslip.getNetIncome(2016, 0));
		});
		it('should return $11,371 when an annual salary of $200000 in 2016', function() {
			assert.equal(11371, payslip.getNetIncome(2016, 200000));
		});
	});
	describe('Get Super', function() {
		it('should return $0 when an annual salary of $0 and a Super rate of 12%', function() {
			assert.equal(0, payslip.getSuper(0, 12));
		});
		it('should return $1200 when an annual salary of $120000 and a Super rate of 12%', function() {
			assert.equal(1200, payslip.getSuper(120000, 12));
		});
	});
	describe('Get Pay', function() {
		it('should return $0 when an annual salary of $0 and a Super rate of 12% for 2016', function() {
			assert.equal(0, payslip.getPay(2016, 0, 12));
		});
		it('should return $9371 when an annual salary of $120000 and a Super rate of 12% for 2016', function() {
			assert.equal(9371, payslip.getPay(2016, 200000, 12));
		});
	});
});