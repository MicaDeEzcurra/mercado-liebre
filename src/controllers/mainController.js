const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		// necesito mandarle dos arrays con info
		let visited = products.filter(function(product){
			return product.category == 'visited' ;
		});
		let inSale = products.filter(function (product) {
			return product.category == 'in-sale';
		});

		res.render('index', {visited, inSale, toThousand}); //puedo escribir solo visited si el nombre es igual 
	},
	search: (req, res) => {
		let productoBuscado = req.query.keywords;
		let searchArray = products.filter(e => e.name == productoBuscado);
		res.render('results', {products: searchArray});
	},
};

module.exports = controller;
