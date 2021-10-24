import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const obtenerProductos = async(callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('productos')
    .find({})
    //.limit(50) Limite de datos que se extraen de la base de datos
    .toArray(callback);
};

const crearProdcuto = async(datosProducto, callback) =>{
    if  (
        Object.keys(datosProducto).includes('id') &&
        Object.keys(datosProducto).includes('category') &&
        Object.keys(datosProducto).includes('estilo') &&
        Object.keys(datosProducto).includes('existencias') &&
        Object.keys(datosProducto).includes('costoProduccion') &&
        Object.keys(datosProducto).includes('valorVenta') &&
        Object.keys(datosProducto).includes('fechaIngreso') 
    ){
        const baseDeDatos = getDB()
        await baseDeDatos.collection('productos').insertOne(datosProducto, callback);
    }else {
        return 'error'
    }
};

const editarProducto = async(id, edicion, callback) =>{
    const filtroProducto = {_id: new ObjectId(id)}
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getDB()
    await baseDeDatos.collection('productos')
    .findOneAndUpdate(
        filtroProducto, 
        operacion, 
        {upsert:true, returnOriginal: true },callback);
};

const eliminarProducto = async(id,callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const baseDeDatos = getDB()
    baseDeDatos.collection('productos').deleteOne(filtroProducto,callback);
};

export {obtenerProductos, crearProdcuto, editarProducto, eliminarProducto};