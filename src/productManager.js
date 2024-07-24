import { promises as fs } from 'fs';

class ProductManager {
    

    constructor(jsonPath) {
        this.jsonPath = jsonPath;
        this.products = [];
        this.init();
    }

    async init() {
     this.products = await this.readProductsJson();
       
        }

    async addProduct(product) {
        try {

            this.products = await this.readProductsJson();
            // Valido si están todos los campos
            this.validateProduct(product);

            // Valido si el código está repetido
            let { code } = product;
            if (this.products.some(item => item.code === code)) {
                throw new Error("Error, el código del producto está repetido");
            } else {
           
                //busco el id mas alto si no lo encuentra da 0



                 const maxId = this.products.length > 0 
                 ? this.products.reduce((max, item) => item.id > max ? item.id : max, 0)
                 : 0;

                this.products.push(product);
                let lastIndex = this.products.length - 1;
                
                this.products[lastIndex].id = maxId + 1 ;
                await this.saveProductsJson();
                console.log("Producto agregado con éxito");
                return this.products[lastIndex];
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProducts() {
        this.products = await this.readProductsJson();
        return this.products;
    }

    async getProductById(id) {

        this.products = await this.readProductsJson();
        const product = this.products.find(item => item.id === id);
        if (product) {
            return product;
        } else {
            throw new Error("Producto no encontrado");
        }
    }
    
    async updateProductById(id, newProduct) {

        this.products = await this.readProductsJson();
        let productbyId = this.products.find(item => item.id === id);
        if (productbyId) {
            Object.assign(productbyId, newProduct);
            await this.saveProductsJson();
            console.log('El producto ha sido actualizado correctamente');
            return productbyId;
        } else {
            return null; // Retorna null si no se encuentra el producto
        }
    }


    async deleteProductById(id) {

        this.products = await this.readProductsJson();
        const productIndex = this.products.findIndex(item => item.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            await this.saveProductsJson();
            console.log('El producto ha sido borrado exitosamente');
            return this.products[productIndex];
        } else {
            throw new Error('No se ha encontrado producto para borrar');
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
            const jsonData = JSON.stringify(this.products, null, 2);
            await fs.writeFile(this.jsonPath, jsonData, 'utf-8');
            console.log("Archivo guardado correctamente");
        } catch (error) {
            throw new Error("Error, en el guardado del archivo");
        }
    }

    validateProduct(product) {
        
        if (typeof product.title !== 'string' || product.title.trim() === '') {
            throw new Error('El título es obligatorio y debe ser un string.');
        }
        if (typeof product.description !== 'string' || product.description.trim() === '') {
            throw new Error('La descripción es obligatoria y debe ser un string.');
        }
        if (typeof product.code !== 'string' || product.code.trim() === '') {
            throw new Error('El código es obligatorio y debe ser un string.');
        }
        if (typeof product.price !== 'number' || isNaN(product.price)) {
            throw new Error('El precio es obligatorio y debe ser un número.');
        }
        if (typeof product.status !== 'boolean') {
            product.status = true;
        }
        if (typeof product.stock !== 'number' || isNaN(product.stock)) {
            throw new Error('El stock es obligatorio y debe ser un número.');
        }
        if (typeof product.category !== 'string' || product.category.trim() === '') {
            throw new Error('La categoría es obligatoria y debe ser un string.');
        }
        if (product.thumbnails && (!Array.isArray(product.thumbnails) || !product.thumbnails.every(thumbnail => typeof thumbnail === 'string'))) {
            throw new Error('Las miniaturas deben ser un array de strings.');
        }
    }
}

export default ProductManager;
