## Synopsis

This is my (Kurt Johnson) submission for the MYOB code examination

## Assumptions

* Front-end does not have to be styled beyond what is depicted in the wireframes
* Could not find the icon after the Firstname in the form in either the bootstrap glyphicons or fontawesome. So I used the glyphicon for “log in” which was similar and seemed appropriate and similar to the icon pictured. Other options would have included validation icons as per bootstrap spec: http://getbootstrap.com/css/#forms-control-validation
* Not going to look up taxable income for years before 2016. This is because there is no way for the application to specify earlier dates - it always deals with issuing payslips for the present. I chose a data structure to be extendable so additional years can be added very easily by editing public/js/buslogic
* For the tax table: one might assume that you could calculate the offset based on previous brackets -for example you can calculate the offset of $80000 to be $17,547 the amount you add. I have not chosen this route - because in my experience with the ATO I have learnt to assume nothing outside the documents they hand you. Hence I have explicitly included the offset within the table.
* For production will be able to use a HTTPS connection so no need for extra authentication.
* Better to save the data as it comes in and recalculate it rather than saving the whole payslip.
* Was going to set the date on the Serverside because you can’t truly trust the client. The issue is if they transmit it just before midnight on the last day of the month the might be an issue with the lag. Chose to send it from the client.

## Rationale for Frameworks
* Mocha with Supertest - the oldest and the best. Supertest gave me the ability to query the server like in curl which was very useful for getting a response.
* Bootstrap: This is the quickest to get everything up and running and looking very similar to the wireframes.
* jQuery: the most extensive library for client side manipulation and 
* mongoose and MongoDB: light but powerful database where I could put a lot of the heavy lifting on. Also conceptually a very good pattern with routers, models etc. 


## Installation

* Clone 
* This project has an external dependency for MongoDB. Download here and run it in the background: https://www.mongodb.com/download-center?jmp=nav#community. Run server on the default port of 27017 (should do this automatically). Did not have time to parameterize it.
* If you do not have Node JS installed you need it. https://nodejs.org/en/download/
* Enter the directory MYOBCodingExercise and type 'npm install'
* 


## Tests
IMPORTANT: To successfully run the tests you need to have the server running in the background.
I used the testing framework Mocha. 

## License

Anyone can use this unless they are going for the same job!