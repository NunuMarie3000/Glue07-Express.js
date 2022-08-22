const express = require('express');
const app = express();
const port = process.env.PORT

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.send("hello, i'm fighting for my life");
});

const shoppingList = require('./Shoppinglist');

app.get('/shoppinglist', (req, res) => {
	res.send(shoppingList);
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