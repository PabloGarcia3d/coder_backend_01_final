import express from 'express';
import exphbs from "express-handlebars";
import __dirname from './utils.js'

import productRouter from "./routes/routes.product.js"; 
import cartRouter from "./routes/routes.cart.js"; 
import viewsRouter from "./routes/router.views.js"; 
import connectToDatabase from './db_conection.js';




const app = express();
const PUERTO = 3000;

//Middleware json
app.use(express.json());
app.use(express.static(__dirname+"\\public"));
app.use(express.urlencoded({extended: true}));
console.log(__dirname+"\\public");



//Configuramos Express-Handlebars

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars"); 

app.set("views", __dirname+"\\views"); 





const httpServer =app.listen(PUERTO, () => {
        console.log(`Servidor escuchando en puerto: ${PUERTO}`);
    });

// Conectar a la base de datos
(async () => {
    try {
        await connectToDatabase();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

// Routes

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/views/", viewsRouter);








