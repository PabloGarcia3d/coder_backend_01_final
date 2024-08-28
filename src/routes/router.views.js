import { Router } from "express";
import ProductManager from '../managers/productManagerDB.js';
import CartManager from '../managers/cartManagerDB.js';
import mongoose from "mongoose";
import __dirname from '../utils.js'


const router = Router();
const prodManager = new ProductManager();
const cartManager = new CartManager();

 // GET todos los productos
    router.get('/products/',  async (req, res) => {
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

            // Hago la consulta de productos con filtros
            const arrayProducts = await prodManager.getProducts(filters);

            //Mapeo los resultados parano tener conflictos

            const newArrayProducts = arrayProducts.docs.map( product => {
                const { ...rest} = product.toObject();
                return rest;
            })

        // envio los datos al motor de plantillas
                
            res.render('productsView', {
                    style: '../../../css/style.css',
                    data: newArrayProducts, 
                    hasPrevPage: arrayProducts.hasPrevPage,
                    hasNextPage: arrayProducts.hasNextPage, 
                    prevPage: arrayProducts.prevPage, 
                    nextPage: arrayProducts.nextPage, 
                    currentPage: arrayProducts.page, 
                    totalPages: arrayProducts.totalPages
                
            });
                  console.log(newArrayProducts)
        } catch (error) {
            res.status(500).send(`Error al obtener los productos: ${error.message}`);
        }
    });

    

// GET todos los productos
router.get('/carts/:cid',  async (req, res) => {
    try {

        const cartId = new mongoose.Types.ObjectId(req.params.cid);
        // Hago la consulta de productos con filtros
        const arrayProducts = await cartManager.getCartById(cartId)

     
        //Mapeo los resultados parano tener conflictos

        const newArrayProducts = arrayProducts.products.map( product => {
            const { _id, ...rest} = product.toObject();
            return rest;
        })


  
    // envio los datos al motor de plantillas
            
        res.render('cartsView', {
                style: '../../../css/style.css',
                data: newArrayProducts, 
                hasPrevPage: arrayProducts.hasPrevPage,
                hasNextPage: arrayProducts.hasNextPage, 
                prevPage: arrayProducts.prevPage, 
                nextPage: arrayProducts.nextPage, 
                currentPage: arrayProducts.page, 
                totalPages: arrayProducts.totalPages
            
        });
              
    } catch (error) {
        res.status(500).send(`Error al obtener los productos: ${error.message}`);
    }
});





export default router;
