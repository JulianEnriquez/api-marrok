import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const obtenerVentas = async(callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('ventas')
    .find({})
    //.limit(50) Limite de datos que se extraen de la base de datos
    .toArray(callback);
};
const crearVenta = async(datosProducto, callback) =>{
    if  (
        Object.keys(datosProducto).includes('noFactura')
    ){
        const baseDeDatos = getDB()
        await baseDeDatos.collection('ventas').insertOne(datosProducto, callback);
    }else {
        return 'error'
    }
};
const editarVenta = async(id, edicion, callback) =>{
    const filtroProducto = {_id: new ObjectId(id)}
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getDB()
    await baseDeDatos.collection('ventas')
    .findOneAndUpdate(
        filtroProducto, 
        operacion, 
        {upsert:true, returnOriginal: true },callback);
};
const eliminarVenta = async(id,callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const baseDeDatos = getDB()
    baseDeDatos.collection('ventas').deleteOne(filtroProducto,callback);
};


export {obtenerVentas, crearVenta, editarVenta, eliminarVenta};