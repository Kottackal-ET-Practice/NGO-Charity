// var express = require('express');
// var router = express.Router();
// var multer = require('multer');
// var upload = multer({dest: 'public/image/'});
// var mongoose = require('mongoose');

// //mongoose.connect('mongodb://localhost:27017/ngotest');

// var FileSchema = new mongoose.Schema({
// 	pid : String,
// 	file : Object,
// 	created : Date
// }, {collection: "files"});

// var File = module.exports = mongoose.model("File", FileSchema);

// router.get('/', function(req,res,next){
// 	res.render('index',{title: 'Express'});
// });
// router.post('/', function(req, res) {
//     // do something w/ req.body or req.files 
// });

// router.post('/upload/:id', upload.any(),function(req,res,next,$rootScope){
// 	var newFile={
// 		pid : req.params.id,
// 		file : req.files,
// 		created : Date.now()
// 	};
// 	var iden=req.params.id;
// 	console.log(req.params.id);
// 	console.log(req.files);

// 	File.create(newFile,function(err,next){
// 				if(err){
// 					next(err);
// 				}
// 				else
// 					res.send(newFile);
// 			});


	// File.find({'pid':iden},function(err,result){
	// 	if(result==null)
	// 	{
	// 		File.create(newFile,function(err,next){
	// 			if(err){
	// 				next(err);
	// 			}
	// 			else
	// 				res.send(newFile);
	// 		});
	// 	}
	// 	else
	// 	{
	// 		File.remove({ 'pid': iden}, function(err) {});

	// 		File.create(newFile,function(err,next){
	// 			if(err){
	// 				next(err);
	// 			}
	// 			else
	// 				res.send(newFile);
	// 		});
	// 	}
	// });

// });

// router.get('/recieve/:user', function(req,res){
// 	console.log("Index.js.....");
// 	var id = req.params.user;
// 	console.log(id);
// 	File.find({'pid':id},function(err,result){
// 		res.send(result);
// 	});
// });

// router.get('/carousel/', function(req,res){
// 	console.log("Index.js.....");
// 	var id = req.params.user;
// 	console.log(id);
// 	File.find({},function(err,result){
// 		res.send(result);
// 	});
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/image/'});
var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/ngotest');

var FileSchema = new mongoose.Schema({
	pid : String,
	file : Object,
	created : Date
}, {collection: "files"});

var File = module.exports = mongoose.model("File", FileSchema);

router.get('/', function(req,res,next){
	res.render('index',{title: 'Express'});
});

router.post('/upload/:id', upload.any(),function(req,res,next){
	var newFile={
		pid : req.params.id,
		file : req.files,
		created : Date.now()
	};
	console.log("Index.js.........")
	console.log(req.params.id);
	console.log(req.files);
	// File.create(newFile,function(err,next){
	// 	if(err){
	// 		next(err);
	// 	}
	// 	else
	// 		res.send(newFile);
	// });

	var x=req.params.id;
	File.find({'pid':x},function(err,result){
		if(result==null)
		{
			File.create(newFile,function(err,next){
				if(err){
					next(err);
				}
				else
					res.send(newFile);
			});
		}
		else
		{
			File.remove({ 'pid': x}, function(err) {
				console.log("deleted......");
			});

			File.create(newFile,function(err,next){
				if(err){
					next(err);
				}
				else
					res.send(newFile);
			});
		}
	});

});

router.get('/recieve/:user', function(req,res){
	console.log("Index.js.....");
	var id = req.params.user;
	console.log(id);
	File.find({'pid':id},function(err,result){
		res.send(result);
	});
});

module.exports = router;