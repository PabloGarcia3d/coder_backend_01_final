import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"; 

//Creo el schema del producto


const  productSchema= new mongoose.Schema({

    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    price: {
        type: Number, 
        required: true
    }, 
    code: {
        type: String, 
        required: true, 
        unique: true
    },
    stock: {
        type: Number, 
        required: true
    }, 
    category: {
        type: String, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    }, 
    thumbnails: {
        type: [String]
    }

});

//Aca agrego el paginate
productSchema.plugin(mongoosePaginate);


//Aca genero el Model, relacionando el documento "product" de la bbdd, al productSchema que acabo de crear

const ProductModel= mongoose.model("products", productSchema)

//Exporto el modelo

export default ProductModel;