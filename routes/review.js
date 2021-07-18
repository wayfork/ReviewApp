const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const mongodbutil = require( '../model' );
const db = mongodbutil.getDb();

router.post('/saveReview', [
	body('review').isLength({ min: 10, max:300 }),
	body('author').isLength({ min: 5, max:20 }),
	body('review_source').isLength({ min: 3, max:20 }),
	body('rating').isInt({ min: 1, max:5 }).withMessage('must contain a number between 1 - 5'),
	body('title').isLength({ min: 5, max:30 }),
	body('product_name').isLength({ min: 3, max:30 })
], async function(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	try{
		let insertData = await db.collection('ratings').insertOne({
		  review : req.body.review,
		  author : req.body.author,
		  review_source :req.body.review_source,
		  rating : req.body.rating,
		  title : req.body.title,
		  product_name : req.body.product_name,
		  reviewed_date : new Date()	  
	  });
		res.send("Thanks for your review.");
	}catch(err){
		console.log(err);
	}
});

router.post('/getReview', async function(req, res, next) {
	let filter = req.body.filter;
	
	try{
		if(!filter ||filter == "date"){
			let findResult = await db.collection('ratings').find({},{"projection":{_id:0}}).sort({reviewed_date: -1}).toArray();
			res.send(findResult);
		}
		else if(filter == "store"){
			let source = req.body.source;
			if(!source)
				res.send("source parameter required eg: \"source:GooglePlayStore\"");
			else{
				let findResult = await db.collection('ratings').find({"review_source":source},{"projection":{_id:0}}).sort({reviewed_date:-1}).toArray(); 
				res.send(findResult);
			}
		}
		else if(filter == "rating"){
			let findResult = await db.collection('ratings').find({},{"projection":{_id:0}}).sort({rating: -1}).toArray(); 
			res.send(findResult);
		}
	}catch(err){
		console.log(err);
	}
});

router.post('/averageMonthlyReview', async function(req, res, next) {
	try{
		let findResult = await db.collection('ratings').aggregate([{$group:{"_id":"$review_source",AverageRating: { $avg: "$rating" }}}]).toArray(); 
		res.send(findResult);
	}catch(err){
		console.log(err);
	}
});

router.post('/categoryReview', async function(req, res, next) {
	try{
		let findResult = await db.collection('ratings').aggregate([{$group: {_id : {review_source : '$review_source',rating:'$rating'}, total:{$sum :1}}},{$sort:{'_id.review_source':1,'_id.rating':-1}}]).toArray(); 
		res.send(findResult);
	}catch(err){
		console.log(err);
	}
});

module.exports = router;
