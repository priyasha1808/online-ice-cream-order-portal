const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const url="mongodb://localhost:27017/";
const {MongoClient}=require("mongodb");
const Client=new MongoClient(url);
const PORT = 5000;
app.use(express.urlencoded({ extended: false }));
async function connect(){
	try{
		await Client.connect();
		console.log('MongoDB Connected');
	}
	catch(err)
	{
		console.log(err);
		process.exit(1);
	}
}

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Define routes for each HTML page
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname,'home.html'));
});

app.get('/regi.html', function (request, response) {
    response.sendFile(path.join(__dirname,'regi.html'));
});

app.get('/contact.html', function (request, response) {
    response.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/about2.html', function (request, response) {
    response.sendFile(path.join(__dirname,'about2.html'));
});

app.get('/product1.html', function (request, response) {
    response.sendFile(path.join(__dirname,'product1.html'));
});

app.get('/insert',async function(req,res){
	
	var doc={name:req.query.name,email:req.query.email,mobile:req.query.mobile,password:req.query.pw,Favourite:req.query.Favourite,gender:req.query.gender};
	const db=Client.db("icecream");
	const coll=db.collection("register");
	var result=await coll.insertOne(doc);
	res.redirect("home.html");
	res.end();
});

app.get('/insert1',async function(req,res){
	
	//var doc={name:req.query.name,email:req.query.email};
	const db=Client.db("icecream");
	const coll=db.collection("register");
	var doc={email:req.query.email,password:req.query.password};
	const user = await coll.findOne(doc);
    if (!user) {
        return res.status(401).send("USER NOT REGISTERED");
    }
    else {
		res.sendFile(path.join(__dirname,'shopping.html'));
		console.log("success");
    }
});

app.get('/update',async function(req,res){
	
	var doc=req.query.email;
	var newdoc=req.query.newpw;
	
	const db=Client.db("icecream");
	const coll=db.collection("login");
	
	var result=await coll.updateOne({email: doc}, {$set:{password:newdoc}});
	res.write("<h1>Updated Ok</h1>");
	res.end();
});

app.get('/findall',async function(req,res){
    const db = Client.db("icecream");
    const coll = db.collection("register");
    var result = await coll.find({},{_id:0,name:1,email:1,mobile:1,password:1,Favourite:1,gender:1}).toArray();
	res.write("<h1>The Users Are</h1>");
    res.write("<ol>");
    for(var i=0;i<result.length;i++)
    {
        res.write("<li>");
        res.write("NAME :"+result[i].name+"<br>"+"EMAIL :"+result[i].email+"<br>"+"MOBILE NO :"+result[i].mobile+"<br>"+"PASSWORD :"+result[i].password+"<br>"+"FAVOURITE :"+result[i].Favourite+"<br>"+"GENDER :"+result[i].gender+"<br>");
        res.write("</li>");
    }
	res.write("</ol>")
	res.write("<a href='home.html'>HOME</a>");
    res.end();
});

app.get('/delete',async function(req,res){
	
	var doc={email:req.query.email};
	const db=Client.db("icecream");
	const coll=db.collection("register");
	const count = coll.countDocuments();
	if(count != 0){
		var result=await coll.deleteOne(doc);
		console.log("DELETED SUCCESSFULLY");
	}
	res.end();
});

app.post("/", function (request, response) {
    var num1 = request.body.num1;
    response.write("<h1>POST WORKING</h1>");
    response.end();
});


app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
    connect();
});
