const express = require("express");
const app = express();
const ProductManager = require("./ProductManager");
const pm = new ProductManager("./listadoDeProductos.json");

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.send("Bienvenido/a la app correspondiente al desafío 3 de Gonzalo Jontade.");
});

app.get("/products", async (req, res) => {
	try {
		const {limit} = req.query;
		const products = await pm.getProducts();

		if (limit) {
			const limitedProducts = products.slice(0, parseInt(limit));
			res.send(limitedProducts);
		} else {
			res.send(products);
		}
	} catch (error) {
		res.status(500).send("Error al obtener productos.");
	}
});

app.get('/products/:pid', async (req,res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await pm.getProductById(productId);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al obtener el producto');
  }
 });

app.listen(8080, () => console.log("Servidor levantado en puerto 8080."));
