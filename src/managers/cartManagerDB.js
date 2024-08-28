import CartModel from "../dao/models/cart.db.model.js";


class CartManager {
    
// Creo Carrito

        async createCart (){
            try {
                //creo nuevo carrito 
                const newCart = new CartModel ({product: []});

                // guardo el documento
                await newCart.save();
                return newCart;

            } catch (error) {
                console.log("Error al crear el nuevo carrito");
                return null;
            }

        }

// Agregar Producto al carrito

       async  addCartProduct(idCart, idProduct, quantity = 1) {
           try {

            const arrayCart = await CartModel.findById(idCart);
            const productExist = arrayCart.products.find(item => item.id_product.toString() === idProduct);
            if (productExist){
                //Si existe agrego cantidad
                productExist.quantity += quantity;
            } else {
                //sino existe agrego el producto
                arrayCart.products.push({ id_product: idProduct, quantity });
            }
            
            // Marco el producto como modificado y lo guardo
            arrayCart.markModified("products");
            await arrayCart.save();
            return arrayCart;
            
           } catch (error) {
            console.log("Error al agregar el producto");
            throw error;
           }
        }
        

    async getCarts() {
        try {
            
            const arrayCart = await CartModel.find().populate('products.id_product');
            return arrayCart;
        } catch (error) {
            console.log("error al buscar los carritos");
            return null;
        }
   
    }

    async getCartById(idCart) {
        try {
            
            const arrayCart = await CartModel.findById(idCart).populate('products.id_product');;
            if (!arrayCart) {
                console.log('No se encontró el carrito.');
            } else {
                console.log("Carrito encontado con exito")
                return arrayCart;
            }
        } catch (error) {
            console.error('Error al buscar el carrito:', error);
        }
    }
    


    async updateCart(idCart, updateProduct) {
        try {
            // Opción { new: true } para devolver el documento actualizado
            const updatedCart = await CartModel.findByIdAndUpdate(idCart, updateProduct, { new: true });
            
            if (!updatedCart) {
                console.log("No se encontró un carrito con ese ID");
                return null;
            }
    
            console.log("Carrito actualizado con éxito");
            return updatedCart;
            
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            return null;
        }
    }

    async deleteCartProductById(idCart, idProduct) {
        try {
            // Busco el carrito por su ID
            const cart = await CartModel.findById(idCart);
    
            // Verifica si el producto existe en el carrito
            const productIndex = cart.products.findIndex(item => item.id_product.toString() === idProduct);
    
            if (productIndex !== -1) {
                // Si el producto existe, lo eliminamos del array de productos
                cart.products.splice(productIndex, 1);
                await cart.save(); // Guardamos el carrito actualizado en la base de datos
                console.log("Producto eliminado del carrito");
            } else {
                console.log("El producto no se encontró en el carrito");
            }
    
            return cart;
    
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            return null;
        }
    }
    
    async emptyCartById(idCart) {
        try {
            // Busco el carrito por su ID
            const cart = await CartModel.findById(idCart);
    
            if (cart && cart.products.length > 0) {
                // Vaciar el array de productos
                cart.products = [];
                
                // Guardar el carrito actualizado en la base de datos
                await cart.save();
                console.log("El carrito ha sido vaciado");
            } else {
                console.log("El carrito no fue econtrado");
            }
    
            return cart;
    
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            return null;
        }
    }


  
    
}

export default CartManager;
