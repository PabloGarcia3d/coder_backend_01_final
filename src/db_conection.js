import mongoose from "mongoose"

// Exportando una funcion conectar a BBDD
 function connectToDatabase() {
    return mongoose.connect("mongodb+srv://pablogarcia:coder@cluster0.xgw51.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => console.log("Conexión a base de datos exitosa!"))
        .catch((error) => console.log("Error en la conexion a la base de datos: ", error));
}
export default connectToDatabase;