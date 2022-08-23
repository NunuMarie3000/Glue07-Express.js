const express = require('express');
const app = express();
const port = process.env.PORT

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.send("hello, i'm fighting for my life");
});

const shoppingList = require('./Shoppinglist');
const suppliesArr = [];
const foodArr = [];
shoppingList.lists[0].items.forEach(item => suppliesArr.push(item.name));
shoppingList.lists[1].items.forEach(item => foodArr.push(item.name));

app.get('/shoppinglist', (req, res) => {
	// res.send(shoppingList);
	res.send(`<h1>shopping list?</h1> <h2>${shoppingList.lists[0].listName}</h2> <p>${suppliesArr}</p><br/> <h2>${shoppingList.lists[1].listName}</h2> <p>${foodArr}</p>`);
});

app.get('/shoppinglist/:listName', (req, res)=>{
	if(req.params.listName === 'supplies'){
		res.send({ supplies: shoppingList.lists[0].items })
	}else if(req.params.listName === 'food'){
		res.send({ food: shoppingList.lists[1].items})
	}else{
		res.status(400).json({ msg: `No member with the list name of ${req.params.listName} found`})
	}
});

app.listen(port || 3003);