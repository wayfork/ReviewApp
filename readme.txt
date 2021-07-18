1. load the shared json file into mongo db
2. update the port details for mongo and node in config.json into config folder or can proceed with default values
3. download the files and run "npm install" in project root folder
4. use "npm start" to start the server
5. use "npm test" to run the test cases 
6. use postman app to test the API's
7. Below are the API details : 
	
	> http://localhost:3000/ - GET
	
	> http://localhost:3000/review/saveReview - POST
		parameters reqd : {review:"best app to hear music",author:"chriss",review_source:"iTunes",rating:3,title:"Good to hear",product_name:"Amazon alexa"}
		
	> http://localhost:3000/review/getReview - POST
		parameters reqd : empty/date/store/rating 
		
	> http://localhost:3000/review/averageMonthlyReview - POST
		parameters reqd : empty
	
	> http://localhost:3000/review/categoryReview - POST
		parameters reqd : empty