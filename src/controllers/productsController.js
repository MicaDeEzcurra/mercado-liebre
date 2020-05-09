const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function nextId(){
	if(products.length > 0){
	let ultimoProducto = products.pop();  //agarra la ultima posicion del array y te la devuelve
	let id = ultimoProducto.id + 1;
	return id ;
};
	return 1; 
};

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(function(product){
			return product.id == req.params.productId ;
		});
		res.render('detail', {product})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: nextId(),
			name: req.body.name, 
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: 'default-image.png'
		}
		let newProducts = [...products, newProduct];

		let productsJson = JSON.stringify(newProducts, null, ' '); //aca transformo el array nuevo de productos que cree arriba, en un JSON, porque para guardar datos en un json, estos datos nuevos tienen q estar en formato json
		//el null, ' ' , se lo tengo que poner siemrpe. eso hace que el json tenga espacios y se vea prolijo 
		fs.writeFileSync(productsFilePath, productsJson); //productsFilePath es la constante que tengo creada mas arriba con la ruta a mi archivo json. osea es mi archivo json inicial, y el segundo parametro es el nuevo json sin el producto que elimine

		res.redirect('/');

	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(function (product) {
			return product.id == req.params.productId;
		});
		res.render('product-edit-form', {product});
	},
	// Update - Method to update
	update: (req, res) => {
		let productosEditados = products.map(product =>{
			if(product.id == req.params.productId){
				product.name = req.body.name;
				product.price = req.body.price;
				product.discount = req.body.discount;
				product.category = req.body.category;
				product.description = req.body.description;
			}
			return product; 
		});
		let productsJson = JSON.stringify(productosEditados, null, ' '); //aca transformo el array nuevo de productos que cree arriba, en un JSON, porque para guardar datos en un json, estos datos nuevos tienen q estar en formato json
		//el null, ' ' , se lo tengo que poner siemrpe. eso hace que el json tenga espacios y se vea prolijo 
		fs.writeFileSync(productsFilePath, productsJson); //productsFilePath es la constante que tengo creada mas arriba con la ruta a mi archivo json. osea es mi archivo json inicial, y el segundo parametro es el nuevo json sin el producto que elimine

		res.redirect('/');

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productosNuevos = products.filter(function(product){
			return product.id != req.params.productId;  //aca filtro mi array de prods y creo un nuevo array con todos los productos MENOS el prod que elimine. como se cual elimine? porque me lo dice req.params.id. osea lo dice la url del prod q elimine
		});
		let productsJson = JSON.stringify(productosNuevos, null, ' '); //aca transformo el array nuevo de productos que cree arriba, en un JSON, porque para guardar datos en un json, estos datos nuevos tienen q estar en formato json
		//el null, ' ' , se lo tengo que poner siemrpe. eso hace que el json tenga espacios y se vea prolijo 
		fs.writeFileSync(productsFilePath, productsJson); //productsFilePath es la constante que tengo creada mas arriba con la ruta a mi archivo json. osea es mi archivo json inicial, y el segundo parametro es el nuevo json sin el producto que elimine

		res.redirect('/');
	}
};

module.exports = controller;

