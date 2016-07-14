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

/* although obvious it's nice to have it explicitly
** defined in the code
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
	return getGrossIncome(annualSalary) * superRate;
}
function getPay(year, annualSalary, superRate)
{
	return getNetIncome(year, annualSalary) - getSuper(annualSalary - superRate);
}
