import express from 'express';

import productRouter from "./routes/routes.product.js"; 
import cartRouter from "./routes/routes.cart.js"; 



const app = express();
const PUERTO = 3000;

//Midlware json
app.use(express.json());

//Inicio el el constructor del manager y luego el servidor


    app.listen(PUERTO, () => {
        console.log(`Servidor escuchando en puerto: ${PUERTO}`);
    });



// Routes

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

 
