
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];


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


	// calculate the date at the moment the payslip is generated
	var now = new Date(); 

	submission =
	{
		firstname : $("#emp-info").find('input#firstname').val(),
		lastname : $("#emp-info").find('input#lastname').val(),
		annualSalary : $("#emp-info").find('input#salary').val(),
		superRate : $("#emp-info").find('input#super').val(),
		yearMonth: now.getFullYear().toString() + now.getMonth().toString()
	};
	console.log(submission);
	if(!validation(submission))
		return false;
	var year = 2016;
	var results = 
	{
		firstname: submission.firstname,
		lastname : submission.lastname,
		date: now.getDate() + " " + monthNames[now.getMonth()] + " " + now.getFullYear(),
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
		$.ajax({
			type: "PUT",
			url: '/payslips',
			data: JSON.stringify(submission),
			success: function (resp) { 
				$('#results-info-container').hide();
				$('#payslip-submit-results').show();
				var result = function(resp)
				{
					if(resp.success)
					{
						return "Payslip submitted correctly!";
					}
					else
					{
						return "Error with payslip submission: " + resp.message + "<br><a href=\"/\"> Click here to retry</a>";
					}
				}
				$('#submit-response-message').html(result(resp));
				
			},
			dataType: 'json',
			contentType: 'application/json'
		});
	});
