var expect = require('chai').expect;
var request = require('request');

var baseUrl = 'http://localhost:3001/';
describe("GET /", ()=> {
	it('Main page content', (done) => {
		request(baseUrl, (error, response, body)=> {
			expect(body).to.equal('Review App');
			done();
		});
	});
});

describe("POST /saveReview", ()=> {
	it('should return status 200', (done) => {
		request.post({
			uri:baseUrl+'review/saveReview',
			body:{review:"best app to hear music",author:"chriss",review_source:"iTunes",rating:3,title:"Good to hear",product_name:"Amazon alexa"},
			json:true},(error, res, body)=> {
				expect(res.statusCode).to.equal(200);
				done();
		});
	});
});

describe("POST /saveReview", ()=> {
	it('should return status 422 - negative test case for insertion', (done) => {
		request.post({
			uri:baseUrl+'review/saveReview',
			body:{review:"",author:"chriss",review_source:"iTunes",rating:3,title:"Good to hear",product_name:"Amazon alexa"},
			json:true},(error, res, body)=> {
				expect(res.statusCode).to.equal(422);
				done();
		});
	});
});

describe("POST /getReview", ()=> {
	it('should return status 200', (done) => {
		request.post(baseUrl+'review/getReview', (error, res, body)=> {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});
});

describe("POST /averageMonthlyReview", ()=> {
	it('should return status 200', (done) => {
		request.post(baseUrl+'review/getReview', (error, res, body)=> {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});
});

describe("POST /categoryReview", ()=> {
	it('should return status 200', (done) => {
		request.post(baseUrl+'review/getReview', (error, res, body)=> {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});
});

