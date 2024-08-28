import { Router } from "express";
import ProductManager from '../managers/productManagerDB.js';


const router = Router();
const manager = new ProductManager();

 // GET todos los productos
    router.get('/',  async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const sort = req.query.sort;
            const category = req.query.category;
            const status = req.query.status;
            const page = parseInt(req.query.page) || 1;

            const filters = {
                sort, 
                category, 
                status, 
                page, 
                limit
            }


            const arrayProducts = await manager.getProducts(filters);
            res.status(200).json(arrayProducts);


        } catch (error) {
            res.status(500).send(`Error al obtener los productos: ${error.message}`);
        }
    });

    // GET producto por ID
     router.get('/:pid', async (req, res) => {
        try {
            const productId = req.params.pid;
            const product = await manager.getProductById(productId);
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
            const productId = req.params.pid;
            const newProductData = req.body;
            const updatedProduct = await manager.updateProductById(productId, newProductData);

            if (updatedProduct) {
                res.status(200).send("Producto actualizado exitosamente")
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
            const productId = req.params.pid;
            await manager.deleteProductById(productId);
            res.status(200).send('el producto se ha sido borrado correctamente');
        } catch (error) {
            res.status(500).send(`Error al borrar el producto: ${error.message}`);
        }

    });



export default router;

