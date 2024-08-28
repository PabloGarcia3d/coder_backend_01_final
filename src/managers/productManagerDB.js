import ProductModel from "../dao/models/product.db.model.js";

class ProductManager {
   
    async addProduct(product) {
        try {

            //Valido los datos del producto

            this.validateProduct(product);

            // Valido si el código está repetido

            const existProduct = await ProductModel.findOne({code: product.code})
            
            if(existProduct) {
                console.log("Error, el codigo de producto esta repetido "); 
                return null; 
           }


           const newProduct = new ProductModel({
            title: product.title,
            description: product.description,
            price: product.price,
            code: product.code,
            stock:product.stock,
            category:product.category, 
            status: true, 
            thumbnails: product.thumbnails || []
             })

            await newProduct.save(); 

            } catch (error) {
                console.log("Error al agregar un producto: ", error); 
                return null; 
            }
    }

    async getProducts(filters) {
        try {
            const filter = {};
            const options = {
                page: 1,
                limit: 10,
                sort: {}
            };
    
            // Filtrar por categoría si existe
            if (filters.category) {
                filter.category = filters.category;
            }
    
            // Filtrar por estado si existe
            if (filters.status) {
                filter.status = filters.status === 'true';
            }
    
            // Ordenar por precio  si existe sort
            if (filters.sort) {
                options.sort.price = filters.sort === 'desc' ? -1 : 1; // `asc` o `desc`
            }
    
            // Asignar página si existe
            if (filters.page) {
                options.page = parseInt(filters.page, 10);
            }
    
            // Asignar límite si existe
            if (filters.limit) {
                options.limit = parseInt(filters.limit, 10);
            }
    
           
    
            // Realizar la consulta con los filtros, ordenamiento y paginación
            const products = await ProductModel.paginate(filter, options)
            return products;
    
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }

    async getProductById(id) {
        try {

            const arrayProducts = await ProductModel.findById(id);
           
            if(!arrayProducts ){
                console.log("No se encontraron productos con ese ID");
                return null;

            }else{
                return arrayProducts
            }
            
            
        } catch (error) {
            console.error("Error al obtener los productos por ID:", error);
        }
    }
    
    async updateProductById(id, newProduct) {
 
        try {

            const arrayProducts = await ProductModel.findByIdAndUpdate(id, newProduct);
           
            if(!arrayProducts ){
                console.log("No se encontraron productos con ese ID");
                return null;

            }else{
                return arrayProducts;
            }
            
            
        } catch (error) {
            console.error("Error al actualizar los productos por ID:", error);
        }
    }

    


    async deleteProductById(id) {

        try {

            const arrayProducts = await ProductModel.deleteOne({_id: id})
            
            if(arrayProducts.deletedCount === 0){
                console.log("No se encontraron productos con ese ID");
                return null;

            }else{
                console.log("Producto eliminado correctamente");
                return arrayProducts;
            }
            
            
        } catch (error) {
            console.error("Error al obtener los productos por ID:", error);
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
