const express = require('express')
const fs = require('fs')
var cors = require('cors')
var products = new Array()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
	isextended: false
}))

if(fs.readFileSync('productdata.txt','utf8')!="")
{
	products = JSON.parse(fs.readFileSync('productdata.txt','utf8'))
}
else
{
	var tempproduct = new Array();
	products = tempproduct;
}

app.get('/products', function(req, res){
	res.send(products);
})

app.post("/addproduct", function(req, res){
	console.log("called");
	console.log(req.body);
	var data = req.body;
	products.push(data);
	fs.writeFile('productdata.txt',JSON.stringify(products), function(err){
 		if(err)
 		{
 			console.log(err)
 		}
 		else
 		{
 			console.log("product data saved")
 		}
 	})
})


app.listen(3000,function(err){
	if(err) console.log(err);
	console.log("server running on port 3000 ....")
})