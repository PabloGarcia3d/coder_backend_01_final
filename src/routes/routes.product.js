import { Router } from "express";
import ProductManager from '../productManager.js';


const router = Router();
const manager = new ProductManager('./src/json/products.json');

 // GET todos los productos
    router.get('/',  async (req, res) => {
        try {
            const limit = parseInt(req.query.limit);
            const productArray = await manager.getProducts();

            if (!limit || limit <= 0 || limit > productArray.length) {
                res.status(200).json(productArray);
            } else {
                const limitProductArray = productArray.slice(0, limit);
                res.status(200).json(limitProductArray);
            }
        } catch (error) {
            res.status(500).send(`Error al obtener los productos: ${error.message}`);
        }
    });

    // GET producto por ID
     router.get('/:pid', async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await manager.getProductById(parseInt(productId));
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).send("Producto no encontrado");
            }
        } catch (error) {
            res.status(500).send(`Error al obtener el producto: ${error.message}`);
        }
    });

    // POST agregar nuevo producto
    router.post('/',  async (req, res) => {
        try {
            const newProduct = req.body;
            const product = await manager.addProduct(newProduct);
            res.status(201).send("Producto agregado exitosamente");
        } catch (error) {
            res.status(400).send(`Error al agregar producto: ${error.message}`);
        }
    });

    // PUT actualizar producto por ID
   router.put('/:pid', async (req, res) => {
        try {
            const productId = parseInt(req.params.pid);
            const newProductData = req.body;
            const updatedProduct = await manager.updateProductById(productId, newProductData);

            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).send("Producto no encontrado");
            }
        } catch (error) {
            res.status(400).send(`Error al actualizar producto: ${error.message}`);
        }
    });



//DELETE borrar producto


    router.delete('/:pid', async (req, res) => {
    
        try {
            const productId = parseInt(req.params.pid);
            await manager.deleteProductById(parseInt(productId));
            res.status(200).send('el producto se ha sido borrado correctamente');
        } catch (error) {
            res.status(500).send(`Error al borrar el producto: ${error.message}`);
        }

    });



export default router;

