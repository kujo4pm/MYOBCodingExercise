var mongoose = require('mongoose');

/* by using a Schema in the mongoose
** framework a lot of the load 
** for validation should be taken
** by the framework 
*/


var Schema = mongoose.Schema;

var payslipSchema = Schema({
	firstname: {
		type: String,
		required: [true, 'Firstname is a required field.']
	},
	lastname:{
		type:String,
		required: [true, 'Lastname is a required field.']
	},
	annualSalary:{
		type:Number,
		required: [true, 'Annual Salary is a required field']
	},
	superRate:{
		type:Number,
		required: [true, 'Super Rate is a required field']
	},
	yearMonth:
	{
		type:String,
		required: [true, 'This payslip was submitted without a month and date']
	}
});


/*
	this index ensures that no duplicate will exist for a 
	combination of firstname, lastname and yearMonth
*/
payslipSchema.index({ firstname: 1, lastname: 1, yearMonth: 1}, { unique: true });

var Payslips = mongoose.model("payslips", payslipSchema);

module.exports = Payslips;

