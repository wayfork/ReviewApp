var expect = require('chai').expect;
var request = require('request');

const config = require('../config/config.json');
const port = config.development.node_port;

var baseUrl = 'http://localhost:'+port+'/';

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

describe("POST /saveReview negative test case 422", ()=> {
	it('should return status 422 - negative test case for insertion', (done) => {
		request.post({
			uri:baseUrl+'review/saveReview',
			body:{review:"",author:"chriss",review_source:"iTunes",rating:3,title:"Good to hear",product_name:"Amazon alexa"},
			json:true},(error, res, body)=> {
				expect(res.statusCode).to.equal(422);
				console.log("response status code : "+res.statusCode);
				console.log(body);
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
		request.post(baseUrl+'review/averageMonthlyReview', (error, res, body)=> {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});
});

describe("POST /categoryReview", ()=> {
	it('should return status 200', (done) => {
		request.post(baseUrl+'review/categoryReview', (error, res, body)=> {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});
});

