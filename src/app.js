import express from 'express';
import exphbs from "express-handlebars";
import __dirname from './utils.js'

import productRouter from "./routes/routes.product.js"; 
import cartRouter from "./routes/routes.cart.js"; 
import viewsRouter from "./routes/router.views.js"; 
import {Server} from "socket.io";

import ProductManager from './managers/productManager.js';
const manager = new ProductManager('./src/json/products.json');



const app = express();
const PUERTO = 3000;

//Middleware json
app.use(express.json());
app.use(express.static(__dirname+"\\public"));
console.log(__dirname+"\\public")

//Configuramos Express-Handlebars

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars"); 

app.set("views", __dirname+"\\views"); 


//Inicio el el constructor del manager y luego el servidor


const httpServer =app.listen(PUERTO, () => {
        console.log(`Servidor escuchando en puerto: ${PUERTO}`);
    });



// Routes

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/home", viewsRouter);


// Creo una instancia de Socket.io

const socket_server = new Server(httpServer);

socket_server.on("connection", async (socket) => {
    
    //escucho la conexion con el cliente
    console.log("Un cliente se conecto al servidor");

    //emito los productos
    socket.emit("updateProducts",  await manager.getProducts()); 
    console.log("Envio productos ");

   //actualizo productos
    socket.on("createProduct",  async (data) => {
        const product = await manager.addProduct(data);
        socket.emit("updateProducts",  await manager.getProducts()); 
    });



   //aBorro los productos
   socket.on("deleteProduct",  async (data) => {
    const product = await manager.deleteProductById(data);
    socket.emit("updateProducts",  await manager.getProducts()); 
    });

});







