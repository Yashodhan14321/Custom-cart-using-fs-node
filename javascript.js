$(document).ready(function(){
	$("#myform").slideUp();
	$("#hide").click(function(){
		$("#myform").slideToggle();
	})
	$("#add").click(function(){
		$("#myform").slideUp();
	})
})

var item = new Array()

function display()
{
	var shttp = new XMLHttpRequest();
	shttp.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200)
		{
			item = JSON.parse(this.responseText);
			getitems();
		}
	}
	shttp.open("GET","http://localhost:3000/products");
	shttp.setRequestHeader("Content-Type","application/json");
	shttp.send();
}
function getitems()
{
	var text = "";
	console.log(item.length);
	for (i = 0; i < item.length; i++)
	{
		console.log("called loop");
		text+="<div style='position:relative;' class='row'>";
		if(item[i].quantity==0)
		{
			text+="<div style='";
			if(i!=0)
			{
				text+="margin-top:25px;";
			}
			text+="background-color:rgba(255,255,0,0.6); border-radius:10px; position:absolute; z-index:10; width:100%; height:90px;'><center style='position:absolute;top:50%; left:50%; transform:translate(-50%, -50%); color:red; font-size:34px; font-weight:900'>OUT OF STOCK</center></div>"
		}
  		text+="<div class='col-sm-4' style='";
  		if(i!=0)
  		{
  			text+="margin-top:25px;";
  		}
  		text+="height:70px; float:left; font-size:16px; float:left;'>"+item[i].itemname;
  		text+="<br>"+item[i].itemdesc+"<br>Price: "+item[i].price+"<br>Quantity: "+item[i].quantity;
  		text+="</div><div class='col-sm-4' style='";
  		if(i!=0)
  		{
  			text+="margin-top:25px;";
  		}
  		text+="height:70px; float:right;'><button class='btn' style='background-color:red;border-color:transparent; color:#fff; border-radius:5px;' onclick=deleteitem("+i+")>DELETE</button>";
  		text+="<br><br><button class='btn' style='border-radius:5px; border-color:transparent; background-color:blue; color:#fff;' onclick=edit("+i+")>EDIT</button></div>";
  		text+="<div class='col-sm-3' style='";
  		if(i!=0)
  		{
  			text+="margin-top:25px;";
  		}
  		text+="height:70px'><button id='cart' style='margin-top:15px; color:#fff; background-color:green; border-radius:5px; width:140px; height:40px;' class='btn' onclick='addtocart("+i+")'><span class='glyphicon glyphicon-shopping-cart'></span>ADD TO CART</BUTTON></div></div>";
	}
	document.getElementById("showval").innerHTML =text;
	text="";
}

function additem(){
	console.log("called");
	var addeditem = {};
	addeditem.itemname = document.getElementById("itemname").value;
	addeditem.itemdesc = document.getElementById("itemdesc").value;
	addeditem.price = document.getElementById("price").value;
	addeditem.quantity = document.getElementById("quantity").value;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200)
		{
			console.log(this.responseText);
		}
	}
	xhttp.open("POST","http://localhost:3000/addproduct");
	xhttp.setRequestHeader("Content-Type","application/json");
	xhttp.send(JSON.stringify(addeditem));
	location.reload();
}
function deleteitem(t)
{

}
function edit(t)
{

}
