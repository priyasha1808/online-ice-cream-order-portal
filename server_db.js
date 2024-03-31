const express = require('express');
const path = require('path');
const url="mongodb://localhost:27017/";
const {MongoClient}=require("mongodb");
const Client=new MongoClient(url);
const app = express();
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

// Middleware
app.use(express.static(path.join(__dirname, 'public','pratise')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});
app.get('/insert.html', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'insert.html'));
});
app.get('/delete.html', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'delete.html'));
});
app.get('/insert',async function(req,res){
	
	var doc={name:req.query.name,email:req.query.email};
	const db=Client.db("stud");
	const coll=db.collection("stud");
	var result=await coll.insertOne(doc);
	res.write("<h1>Insert Ok</h1>");
	res.write("||<a href='index.html'>Index</a> 		||<a href='insert.html'>Insert</a> 		||<a href='findOne.html'>DisplayOne</a> 		||<a href='findAll'>DisplayAll</a> 		||<a href='delete.html'>Delete</a> 		||<a href='Update.html'>Update</a>");
	res.end();
});
app.get('/delete',async function(req,res){
	
	var doc={email:req.query.email};
	const db=Client.db("stud");
	const coll=db.collection("stud");
	var result=await coll.deleteOne(doc);
	res.write("<h1>deleted Ok</h1>");
	res.write("||<a href='index.html'>Index</a> 		||<a href='insert.html'>Insert</a> 		||<a href='findOne.html'>DisplayOne</a> 		||<a href='findAll'>DisplayAll</a> 		||<a href='delete.html'>Delete</a> 		||<a href='Update.html'>Update</a>");
	res.end();
});

app.get('/update',async function(req,res){
	
	var doc={email:req.query.email};
	var newdoc={name:req.query.name};
	
	const db=client.db("mepco");
	const coll=db.collection("stud");
	
	var result=await coll.updateOne(doc,{$set:doc});
	res.write("<h1>Updated Ok</h1>");
	res.write("||<a href='index.html'>Index</a> 		||<a href='insert.html'>Insert</a> 		||<a href='findOne.html'>DisplayOne</a> 		||<a href='findAll'>DisplayAll</a> 		||<a href='delete.html'>Delete</a> 		||<a href='Update.html'>Update</a>");
	res.end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connect();
});
