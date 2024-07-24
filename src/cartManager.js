import { promises as fs } from 'fs';

class CartManager {
    

    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.cartProducts = [];
        this.init();
    }

    async init() {
     this.cartProducts = await this.readProductsJson();
       
        }

       async  addCartProduct(idCart, idProduct) {
            try {

                this.cartProducts = await this.readProductsJson();
                
                // Busco si el carrito existe
                const cartIndex = this.cartProducts.findIndex(item => item.idCart === idCart);
                if (cartIndex !== -1) { 

                    // Busco si el producto existe dentro del carrito
                    const productIndex = this.cartProducts[cartIndex].productsCart.findIndex(item => item.idProduct === idProduct);
        
                    if (productIndex !== -1) { // Si el producto existe sumo uno a quantity
                        

                        const product = this.cartProducts[cartIndex].productsCart[productIndex].quantity += 1 ;
                        await this.saveProductsJson();

                        return this.cartProducts[cartIndex].productsCart[productIndex];
                        

                    } else { // Si el producto no existe agrego un producto nuevo

                        this.cartProducts[cartIndex].productsCart.push({"idProduct": idProduct, "quantity":1});
                        await this.saveProductsJson();

                        const lastIndex =this.cartProducts[cartIndex].productsCart.length -1;

                        return this.cartProducts[cartIndex].productsCart[lastIndex];
               
                    }
                } else {

                    console.log("Carrito no encontrado");
                   
                }
            } catch (error) {
                console.error(error);
            }
        }
        

    getCarts() {
        return this.cartProducts;
    }

    getCartById(id) {
        const cart = this.cartProducts.find(item => item.idCart === id);
        if (cart) {
            
            return cart.productsCart;
        } else {
            throw new Error("Carrito  no encontrado");
        }
    }
    


    async readProductsJson() {
        try {
            const readFile = await fs.readFile(this.jsonPath, "utf-8");
            const productsArray = JSON.parse(readFile);
            return productsArray;
        } catch (error) {
            console.error("Error leyendo el archivo:", error);
            return [];
        }
    }

    async saveProductsJson() {
        try {
            const jsonData = JSON.stringify(this.cartProducts, null, 2);
            await fs.writeFile(this.jsonPath, jsonData, 'utf-8');
            console.log("Archivo guardado correctamente");
        } catch (error) {
            throw new Error("Error, en el guardado del archivo");
        }
    }

    
}

export default CartManager;
