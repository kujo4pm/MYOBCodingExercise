/* Given 
The calculation details will be the following:
 pay period = per calendar month
 gross income = annual salary / 12 months
 income tax = based on the tax table provided below
 net income = gross income - income tax
 super = gross income x super rate
 pay = net income - super
*/

// this data structure is expandable for more 
// years
var taxTable = [];//the index is the tax year ending

taxTable[2016] = [
{
	range: [0,18200],
	rate: 0,
	offset: 0
},
{	range: [18201, 37000],
	rate: 0.19,
	offset: 0
},
{
	range: [37001, 80000],
	rate: 0.325,
	offset: 3572
}, 
{
	range: [80001, 180000],
	rate:0.37,
	offset: 17547
},
{
	range: [180001, Infinity],
	rate: 0.45,
	offset: 54547
}];	


function getCurrentPayPeriod(date)
{

}

/* 
** Although obvious it's nice to have these functions explicitly
** defined in the code so they relate closely to the spec. 
** There is a very very slight cost in performance but the 
** benefits come in readability of the code.
*/
function getGrossIncome(annualSalary)
{
	return annualSalary / 12;
}

function getIncomeTax(year, annualSalary) 
{
	var incomeTax = 0;
	if(!taxTable[year] instanceof Array)
		return NaN;
	else
	{
		for(var x = 0, currentBracket = taxTable[year][x]; 
			x <  taxTable[year].length ; 
			currentBracket = taxTable[year][++x])
		{
			if(annualSalary >= currentBracket.range[0] &&
				annualSalary <= currentBracket.range[1] )
			{
				return currentBracket.offset + (annualSalary - (currentBracket.range[0] - 1)) * currentBracket.rate;
			}
		}
		return incomeTax;
	}
}
function getNetIncome(year, annualSalary)
{
	return getGrossIncome(annualSalary) - getIncomeTax(year, annualSalary);
}
function getSuper(annualSalary, superRate)
{
	return getGrossIncome(annualSalary) * superRate / 100;
}
function getPay(year, annualSalary, superRate)
{
	return getNetIncome(year, annualSalary) - getSuper(annualSalary, superRate);
}



// some simple validation for the form

function validation(submission)
{	
	var firstname = submission.firstname;
	var lastname = submission.lastname;
	var salary = submission.annualSalary;
	var superRate = submission.superRate;
	if(firstname == '' || !firstname 	||
		lastname == '' || !lastname		||
		salary ==	'' || 
		superRate =='')
	{
		alert('Please fill out all fields');
		return false;
	}
	if(salary < 0		|| superRate < 0	||
		isNaN(salary)	|| isNaN(superRate))
	{
		alert('Annual Salary and Super Rate must be positive numbers');
		return false;
	}
	if(superRate > 100)
	{
		alert('Cannot have super more than 100%');
		return false;
	}
	return true;
}
var submission = {};

$("#generate").on('click', function(event)
	{
		$('#emp-info-container').hide();
		$('#results-info-container').show();
		submission =
		{
			firstname : $("#emp-info").find('input#firstname').val(),
			lastname : $("#emp-info").find('input#lastname').val(),
			annualSalary : $("#emp-info").find('input#salary').val(),
			superRate : $("#emp-info").find('input#super').val()
		};
		console.log(submission);
		if(!validation(submission))
			return false;
		var year = 2016;
		var results = 
		{
			firstname: submission.firstname,
			lastname : submission.lastname,
			date: $.now(),
			frequency: 'Monthly',
			annualIncome: submission.annualSalary,
			grossIncome: getGrossIncome(submission.annualSalary),
			incomeTax: getIncomeTax(year, submission.annualSalary),
			netIncome: getNetIncome(year, submission.annualSalary),
			super: getSuper(submission.annualSalary, submission.superRate),
			pay: getPay(year, submission.annualSalary, submission.superRate)
		};
		populateConfirm(results);
	});

function populateConfirm(results)
{
	$('#resName')		.text(results.firstname + ' ' + results.lastname);
	$('#resDate')		.text(results.date);
	$('#resFrequency')	.text(results.frequency);
	$('#resAnnIncome')	.text("$ " + accounting.formatNumber(results.annualIncome));
	$('#resGrossIncome').text("$ " + accounting.formatNumber(results.grossIncome));
	$('#resIncomeTax')	.text("$ " + accounting.formatNumber(results.incomeTax));
	$('#resNetIncome')	.text("$ " + accounting.formatNumber(results.netIncome));
	$('#resSuper')		.text("$ " + accounting.formatNumber(results.super));
	$('#resPay')		.text("$ " + accounting.formatNumber(results.pay));
}

$("#pay-now").on('click', function(event)
	{
		//$.post('/payslips', JSON.stringify(submission), function(){ alert("data sent!")}, 'json');
		$.ajax({
		  type: "POST",
		  url: '/payslips',
		  data: JSON.stringify(submission),
		  success: function(){ console.log("data sent!")},
		  dataType: 'json',
		  contentType: "application/json"
		});
}