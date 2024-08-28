import { Router } from "express";
import CartManager from '../managers/cartManagerDB.js';
import mongoose from "mongoose";

const router = Router();
const cartManager = new CartManager();



router.get('/', async (req, res) => {
    try {
       
        const cartArray = await cartManager.getCarts();
        res.status(200).json(cartArray);
 
    } catch (error) {
        res.status(500).send(`Error al obtener los productos: ${error.message}`);
    }
});

    // GET producto por ID
    
    router.get('/:cid', async (req, res) => {
        try {
            const cartId = new mongoose.Types.ObjectId(req.params.cid);

            const cartArray = await cartManager.getCartById(cartId);
            if (cartArray) {
                res.status(200).json(cartArray);
            } else {
                res.status(404).send("Carrito no encontrado");
            }
        } catch (error) {
            res.status(500).send(`Error al obtener el carrito: ${error.message}`);
        }
    });


    
///// POST CREAR carrito
        router.post('/', async (req, res) => {
            try {

                const newCart = await cartManager.createCart();

                if (newCart) {
                    console.log(newCart);
                    res.status(200).json(newCart);
                } else {
                    res.status(404).send("Error, no se pudo crear el Carrito ");
                }
            } catch (error) {
                res.status(500).send(`Error al crear el carrito: ${error.message}`);
            }
        });





        // PUT producto por ID
        router.put('/:cid/products/:pid', async (req, res) => {
            try {
                const cartId = req.params.cid;
                const prodId = req.params.pid;

                const producto = await cartManager.addCartProduct(cartId, prodId);

                if (producto) {
                    console.log(producto);
                    res.status(200).json(producto);
                } else {
                    res.status(404).send("Carrito no encontrado");
                }
            } catch (error) {
                res.status(500).send(`Error al obtener el carrito: ${error.message}`);
            }
        });



        
        // PUT Actualiza carrito con array de productos
        router.put('/:cid', async (req, res) => {
            try {
                const cartId = req.params.cid;
                const { products } = req.body;

        // Convierto cada id_product que vien como string a ObjectId de mongoose
                const updatedProducts = products.map(product => ({
                    id_product: new mongoose.Types.ObjectId(product.id_product),
                    quantity: product.quantity
                }));
                
        // Actualizo el carrito
                const producto = await cartManager.updateCart(cartId,   { $set: { products: updatedProducts } } );
                console.log(updatedProducts);

                if (producto) {
                    console.log(producto);
                    res.status(200).json(producto);
                } else {
                    res.status(404).send("Carrito no encontrado");
                }
            } catch (error) {
                res.status(500).send(`Error al obtener el carrito: ${error.message}`);
            }
        });



        // DELETE Borra los productos por id de carrito y producto
        router.delete('/:cid/products/:pid', async (req, res) => {
            try {
                const cartId = req.params.cid;
                const productId = req.params.pid;
             
                const producto = await cartManager.deleteCartProductById(cartId, productId);

                if (producto) {
                    console.log(producto);
                    res.status(200).json(producto);
                } else {
                    res.status(404).send("No se pudo borra el producto, Carrito no encontrado");
                }
            } catch (error) {
                res.status(500).send(`No se pudo borrar le producto, Error al obtener el carrito: ${error.message}`);
            }
        });

            // DELETE Vacia el carrito 
              router.delete('/:cid', async (req, res) => {
                try {
                    const cartId = req.params.cid;
                    
                 
                    const producto = await cartManager.emptyCartById(cartId);
    
                    if (producto) {
                        console.log(producto);
                        res.status(200).json(producto);
                    } else {
                        res.status(404).send("No se pudo vaciar el carrito, Carrito no encontrado");
                    }
                } catch (error) {
                    res.status(500).send(`No se pudo vaciar el carrito, Error al obtener el carrito: ${error.message}`);
                }
            });



export default router;

