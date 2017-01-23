var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

mongoose.connect('mongodb://localhost:27017/ngotest');


var routes = require('./public/routes/index');
var users = require('./public/routes/users');

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  
   auth: {
       user: "ngocharity@gmail.com",
       pass: "kottackaldevi"
   }
});

// app.set('view engine', './file.html');

app.use(express.static(__dirname + '/public'));
app.use('/routes', routes);
app.use('/users', users);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:"this is secret"}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.use(morgan('dev'));

var UserSchema = new mongoose.Schema({
	firstname : String,
	lastname : String,
	email : String,
	username: String,
	password: String,
	role : String
}, {collection: "users"});

var User = mongoose.model("User", UserSchema);

var ProjectSchema = new mongoose.Schema({
	title : String,
	category : String,
	url : String,
	description : String,
	total	: Number,
	amount	: Number,
	donation: Number,
	option	: [{
		name : String,
		percent: Number
	 }]
}, {collection: "projects"});

var Project = mongoose.model("Project", ProjectSchema);

var DonateSchema = new mongoose.Schema({
	UserId : String,
	ProjectId : String,
	Type : String,
}, {collection: "donates"});

var Donate = mongoose.model("Donate", DonateSchema);

var GroupSchema = new mongoose.Schema({
	GroupName : String,
	Category : String,
	MemberId : [{mid:String}],
	AdminId : String
}, {collection: "groups"});

var Group = mongoose.model("Group", GroupSchema);

var SelectSchema = new mongoose.Schema({
	GroupId : String,
	ProjectId : String,
	select : Boolean,
	selected : Date
}, {collection: "selects"});

var Select = mongoose.model("Select", SelectSchema);

var TempSchema = new mongoose.Schema({
	UserId : String,
	GroupId : String,
	ProjectId : String,
	title : String,
	category : String,
	option	: [{
		name : String,
		percent: Number
	 }]
}, {collection: "temps"});

var Temp = mongoose.model("Temp", TempSchema);

var VoteSchema = new mongoose.Schema({
	GroupId : String,
	ProjectId : String,
	MemID :  String,
	Title : String,
	Category :String,
	 Payment : [{
	 	option : String,
	 	amount :Number
	 }]
}, {collection: "votes"});

var Vote = mongoose.model("Vote", VoteSchema);


// UserSchema.pre('save', function(next){
// 	var euser = this;
// 	bcrypt.genSalt(11,function(err,salt){
// 		if(err){
// 			return next(err);
// 		}
// 		bcrypt.hash(euser.password, salt, function(err, hash){
// 			if(err){
// 				return next(err);
// 			}
// 			euser.password=hash;
// 			next();
// 		});
// 	});
// });

Temp.collection.drop();


passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({username : username, password : password},function(err, user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false);
		}
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(user, done){
	User.findById(user._id,function(err, user){
		done(err, user);
	});
});

app.post("/rest/logoutt", function(req,res)
{
	req.logOut();
	res.send(200);
});

app.put("/rest/update", function(req,res)
{
	var user=req.body;
	User.findById(user._id, function(err,foundUser){
		foundUser.update(req.body,function(err, count){
			res.send(count);
		});
	});
});

app.put("/rest/updateproject", function(req,res)
{
	var user=req.body;
	console.log(user);
	Project.findById(user._id, function(err,foundUser){
		foundUser.update(req.body,function(err, count){
			res.send(count);
		});
	});
});

app.put("/rest/updatee/:id", function(req,res)
{
	var user=req.body;
	var x=req.params.id;
	var i;
	console.log(x);
	console.log("Server......");
	var d={
		UserId : x,
		ProjectId : user._id
	}
	Donate.create(d,function(err,doc){
			
	});
	Project.findById(user._id,function(err,result){
		i=result.donation+user.amount;
		Project.findOneAndUpdate({_id : user._id},{$set:{donation:i}},function(err,data){
			res.json(data);
		});
	});
});


app.put("/rest/up/:id", function(req,res)
{
	var user=req.body;
	var x=req.params.id;
	var i;
	console.log("Updateee....");
	console.log(user);
	console.log(x);
	console.log("Server......");
	var d={
		UserId : user._id,
		ProjectId : x
	}
	Donate.create(d,function(err,doc){
			
	});
	Project.findById(x,function(err,result){
		console.log("Project Searching....");
		console.log(result);
		i=result.donation+result.amount;
		Project.findOneAndUpdate({_id :x},{$set:{donation:i}},function(err,data){
			res.json(data);
		});
	});
});


app.get("/rest/projectEdit/:cat", function(req,res)
{
	var x=req.params.cat;
	Project.find({'category' : x},function(err,result){
		res.json(result);
	});
});


// app.get("/rest/projectEdit/:cat", function(req,res)
// {
// 	var x=req.params.cat;
// 	Project.find({'category' : x},function(err,result){
// 		res.json(result);
// 	});
// });


app.get("/rest/selectProject/:id", function(req,res)
{
	var x=req.params.id;
	Project.findOne({'_id' : x},function(err,result){
		res.json(result);
	});
});


app.get("/rest/viewgroup/:id", function(req,res)
{
	var x=req.params.id;
	console.log(x);
	Group.find({'MemberId':{$elemMatch: {'mid': x}}},function(err,result){
		res.json(result);
	 });
});

app.get("/rest/managegroup/:id", function(req,res)
{
	var x=req.params.id;
	console.log("Manage Group.....");
	console.log(x);
	Group.find({'AdminId': x},function(err,result){
		res.json(result);
	 });
});

app.get("/rest/history/:id", function(req,res)
{
	var x=req.params.id;
	console.log("View History.....");
	console.log(x);
	Vote.find({'MemID': x},function(err,result){
		res.json(result);
	 });
});


// app.get("/rest/tempdrop", function(req,res)
// {

// 	Temp.remove({}, function(err) { 
//  		console.log('temp removed');
// 	});
// 	console.log("Droppingggg....");

// });



app.get("/rest/viewvote/:id", function(req,res)
{

	console.log("View vote...................");


	var x=req.params.id;
	var arr=[];
	var ar=[];
	var ary=[];
	var test={};


	Group.find({'MemberId':{$elemMatch: {'mid': x}}},function(err,result){

			console.log("Entered..........");
		for(var i=0;i<result.length;i++)
	 	{
	 		arr[i]=result[i]._id;
	 		//console.log(arr[i]);
	 	}
	 	console.log(arr);
	 	var d=Date.now();
	 	console.log(d);
	 	Select.find({GroupId : { "$in" : arr},select : false}, function(err,usr)
	 	{
	 	
	 		console.log("Select.................");


	 		for(var i=0,j=0;i<usr.length;i++)
		 	{
		 		console.log(d);
		 		console.log(Date.parse(usr[i].selected));
		 		var c=Date.parse(usr[i].selected)+120000;
		 		console.log(c);
		 		if(c>d)
		 		{
		 			console.log("Hello Date");
		 			ar[j]=usr[i].ProjectId;
		 			ary[j]=usr[i].GroupId;
		 			j++;
		 		}
		 	}


		 	Project.find({_id : { "$in" : ar}}, function(err,user)
		 	{
		 		test.a=usr;
		 		test.b=user;
		 		console.log("Projects...................");
		 		console.log(usr.length);
		 		console.log(user);

		 		for(var i=0;i<user.length;i++)
		 		{
		 			console.log("Looping............");
		 			Temp.create({"UserId":x,"GroupId":ar[i],"ProjectId":ary[i],"title":test.b[i].title, "category":test.b[i].category,"option":test.b[i].option},function(err,doc){
						
						console.log("Temp created..........");

						//res.json(doc);
					});
		 		}
		 			
		 		Temp.find({},function(err,result){
		 				console.log("Voting.....");
						console.log(result);
						res.json(result);
				});

		 	});

		});
	 });
});



app.post("/rest/projectvote", function(req,res)
{
	console.log('Vote server.....');
	var user = req.body;
	var tt=[];
	tt = req.body.array;
	var a;
	var te={};var pay=[];


	Group.findOne({'_id': user.ProjectId},function(err,rest){
		Project.findOne({'_id': user.GroupId},function(err,test){
			a = test.amount/rest.MemberId.length;	
			if(tt.length>0){
				var c=0;
				for(var i=0;i<tt.length;i++)
				{
					for(var j=0;j<req.body.option.length;j++)
					{
						//console.log(tt[i]);
						if(tt[i]==req.body.option[j].name){
							//console.log(tt[i]);	
							te.option=tt[i];
							te.amount=a/tt.length;	
							console.log(i+" "+c);
							pay[c]=te;
							c++;	
							
						}
						te={};
					}
							
				}
				Vote.create({"GroupId":user.ProjectId,"ProjectId":user.GroupId,"MemID":user.UserId,"Title":user.title,"Category":user.category, "Payment":pay},function(err,doc){
					//res.json(doc);
					console.log("success****");
				Select.findOneAndUpdate({'ProjectId':user.GroupId, 'GroupId':user.ProjectId},{$set:{'select':true}},function(err,data){
					//res.json(data);
					console.log(data);
						});
				// Temp.remove({'ProjectId':user.GroupId}, function(err) { 
  		// 			console.log('temp removed');
				// 	});
				});
			}

		});
	});
});

var myArray={};
app.get("/rest/projectHistory/:cat/:user", function(req,res)
{

	var x=req.params.cat;
	console.log("Server***");
	var user=req.params.user;
	var i=0;
	Donate.find({UserId : x},function(err,result){
		var len=ObjectLength(result);
		console.log("LOOP out");
		
			Vote.find({'MemID':x},function(err,resultt){
			console.log(resultt);
			res.json(resultt);
			});
	});
});



app.get("/rest/projectdonationHistory/:user", function(req,res)
{

	console.log("Server***");
	this.myArray={};
	var arr=[];
	var user=req.params.user;
	var i=0;
	console.log("User ID"+user);
	Donate.find({UserId : user},function(err,result){
		
		var len=ObjectLength(result);
		for(var i=0;i<result.length;i++)
	 	{
	 		arr[i]=result[i].ProjectId;
	 	}
	 	console.log(arr);
		
			Project.find({'_id' : { "$in" : arr}},function(err,resultt){
				console.log("Resultt");
				console.log(resultt);
				
				res.json(resultt);
			});

		
		console.log(myArray);
		
	});
});


// var myArray={};
// app.get("/rest/projectdonationHistory/:cat/:user", function(req,res)
// {

// 	var x=req.params.cat;
// 	console.log("Server***");
// 	var user=req.params.user;
// 	var i=0;
// 	Donate.find({UserId : x},function(err,result){
// 		var len=ObjectLength(result);
// 		console.log("LOOP out");
// 		for(i=0;i<len;i++)
// 		{
// 			Project.find({'category' : req.params.user, '_id' : result[i].ProjectId},function(err,resultt){
		
// 				if(resultt!=0){
// 					myArray["name"] = resultt;
// 				}
				
// 			});

// 		}
// 		console.log(myArray);
// 		res.json(myArray);
// 	});
// });




// Object length
function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

//Array reinitilizing
function initialize() {
    myArray={};
 };


app.get("/rest/viewpayment/:id", function(req,res)
{


	// Temp.remove({}, function(err) { 
 //   		console.log('temp removed');
	// });
	
	console.log("View Payment...................");

	console.log(req.params.id);
	var x=req.params.id;
	var arr=[];
	var ar=[];
	var ary=[];
	var test={};
	var d=Date.now();

	Group.find({'AdminId':x},function(err,result){

			console.log("Entered..........");
			console.log(result);
		for(var i=0;i<result.length;i++)
	 	{
	 		arr[i]=result[i]._id;
	 	}
	 	console.log(arr);
	 	Select.find({GroupId : { "$in" : arr}}, function(err,usr)
	 	{
	 	
	 		console.log("Select.................");
	 		console.log(usr);
	 		
	 		for(var i=0,j=0;i<usr.length;i++)
		 	{
		 		var c=Date.parse(usr[i].selected)+120000;
		 		if(c<=d)
		 		{
		 			console.log("Hello Payment");
		 			ar[j]=usr[i].ProjectId;
		 			ary[j]=usr[i].GroupId;
		 			j++;
		 		}
		 				 		
		 	}
		 	Project.find({_id : { "$in" : ar}}, function(err,user)
		 	{
		 		console.log(ar);
		 		console.log(user);
		 		res.json(user);
		 	});
		 	Select.findOneAndUpdate({'ProjectId':ar, 'GroupId':ary},{$set:{'select':true}},function(err,data){
					//res.json(data);
					console.log(data);
			});
	 	});
	 });
});


app.put("/rest/updateOption/:id", function(req,res)
{
	var user=req.body;
	var x=req.params.id;
	Project.findOneAndUpdate({_id : x},{$push:{option:req.body}},function(err,data){
		res.json(data);
	});
});
app.put("/rest/updateGroup/:id/:user", function(req,res)
{
	var user=req.params.user;
	var x=req.params.id;
	console.log("Member Id....");
	console.log(user);
	console.log("Group Id....");
	console.log(x);
	Group.findOneAndUpdate({_id : x},{$push:{MemberId:{mid:user}}},function(err,data){
			console.log(data);
			res.json(data);
		});
});

app.put("/rest/updateGroupid/:id/:user", function(req,res)
{
	var user=req.params.user;
	var x=req.params.id;
	console.log("Member Id....");
	console.log(user);
	console.log("Group Id....");
	console.log(x);
	User.findOne({'email':user},function(err,doc){
		var u=doc._id;
		console.log("uuuuu"+u);
	if(doc!=null)
	{
	Group.findOneAndUpdate({_id : x},{$push:{MemberId:{mid:u}}},function(err,data){
			console.log(data);
			res.json(data);
		});
}
});
});

app.post("/rest/register", function(req,res)
{
	console.log('reg server');
	var user=req.body;
	user.role="user";
	console.log(user);
	var f=user.email;
	User.findOne({'email':f},function(err,doc){
	if(doc==null)
	{	
	User.create(user,function(err,doc){
			res.json(doc);
			console.log("doc"+doc);
	});
	}
	else
	{
		res.json(doc);
	}

	});
});

app.post("/rest/select/:gid/:pid", function(req,res)
{
	console.log('Selection....');
	var x=req.params.gid;
	var y=req.params.pid;
	var d= Date.now();
	console.log(d);
	Select.create({"GroupId":x,"ProjectId":y,"select":false,"selected":d},function(err,doc){
			res.json(doc);
	});
	smtpTransport.sendMail({ 
	    from: "Admin NGO Charity <ngocharity@gmail.com>",
	    to: "Devi V.S. <kottackaldevi@gmail.com>",
	    subject: "NGO Charity - Vote for the donation",
	    text: "Vote for the project selected by your group within 2 days..."
	    }, function(error, response){
	    if(error){
	         console.log(error);
	    }else{
	         console.log("Message sent: " + response.message);
	    }
	});
});

app.post("/rest/memAdd", function(req,res)
{
	var user=req.body;
	var pass=user.name+'123';
	var rol="user";
	User.create({"firstname":user.name,"lastname":user.lname,"email":user.email,"username":user.name,"password":pass,"role":rol},function(err,doc){
			res.json(doc);
	});
});

app.post("/rest/project", function(req,res)
{
	console.log('reg server');
	var p=req.body;
	console.log(p);
	p.donation=0;
	p.url=p.img;
	Project.create(p,function(err,doc){
			res.json(doc);
	});
});

app.post("/rest/groupprofile/:id", function(req,res)
{
	var user=req.body;
	console.log(user);
	var p=req.params.id;
	console.log(p);
	var m=[{}];
	Group.create({"GroupName":user.name, "Category":user.category, "AdminId":p, "MemberId":{mid:p}},function(err,doc){
		res.json(doc);
	});
});


app.post("/rest/login", passport.authenticate("local"), function(req,res)
{
	var luser=req.body;
	console.log(luser.role);
	User.findOne({username: luser.username, password: luser.password, role: luser.role}, function(err, foundUser){
		res.json(foundUser);
		
		// bcrypt.compare(luser.password, foundUser.password, function(err, result){
		// 	if(result){
		// 		res.json(foundUser);
		// 	}
		// });	
	});
});

app.get("/rest/loggedin", function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});

app.listen(3000);