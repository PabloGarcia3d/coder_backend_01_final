import { Router } from "express";
import CartManager from '../cartManager.js';


const router = Router();
const cartManager = new CartManager('./src/json/cart.json');



router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const cartArray = await cartManager.getCarts();
        res.status(200).json(cartArray);
 
    } catch (error) {
        res.status(500).send(`Error al obtener los productos: ${error.message}`);
    }
});





    // GET producto por ID
    
    router.get('/:cid', async (req, res) => {
        try {
            const cartId = parseInt(req.params.cid);
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


        // POST producto por ID
        router.post('/:cid/products/:pid', async (req, res) => {
            try {
                const cartId = parseInt(req.params.cid);
                const prodId = parseInt(req.params.pid);

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



export default router;

