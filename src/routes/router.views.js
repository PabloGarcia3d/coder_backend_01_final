import { Router } from "express";
import ProductManager from '../managers/productManager.js';
import __dirname from '../utils.js'


const router = Router();
const manager = new ProductManager('./src/json/products.json');

 // GET todos los productos
    router.get('/',  async (req, res) => {
        try {
        const productArray = await manager.getProducts();
         
        res.render('home', {style: '../../../css/style.css', productArray});
                  
        } catch (error) {
            res.status(500).send(`Error al obtener los productos: ${error.message}`);
        }
    });

    
 // GET todos los productos
 router.get('/realtime',  async (req, res) => {
    try {
    const productArray = await manager.getProducts();
     
    res.render('realTimeProducts', { style: '../../css/style.css', productArray});
              
    } catch (error) {
        res.status(500).send(`Error al obtener los productos: ${error.message}`);
    }
});




export default router;
