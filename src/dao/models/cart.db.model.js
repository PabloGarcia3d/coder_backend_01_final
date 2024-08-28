import mongoose from "mongoose";


//Creo el schema del carrito, y referencio el producto


const  cartSchema= new mongoose.Schema({
    products: [
        {
            id_product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number, 
                required: true
            }
        }
    ]
});




//Aca genero el Model, relacionando el documento "product" de la bbdd, al productSchema que acabo de crear

const CartModel= mongoose.model("carts", cartSchema)

//Exporto el modelo

export default CartModel;