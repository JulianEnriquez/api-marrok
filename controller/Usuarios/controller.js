import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const obtenerUsuarios = async(callback) =>{
    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('usuarios')
    .find({})
    //.limit(50) Limite de datos que se extraen de la base de datos
    .toArray(callback);
};

const crearUsuarios = async(datosProducto, callback) =>{
    if  (
        Object.keys(datosProducto).includes('idUsuario') &&
        Object.keys(datosProducto).includes('nombre') &&
        Object.keys(datosProducto).includes('rol') &&
        Object.keys(datosProducto).includes('estado')
    ){
        const baseDeDatos = getDB()
        await baseDeDatos.collection('usuarios').insertOne(datosProducto, callback);
    }else {
        return 'error'
    }
};

const editarUsuarios = async(id, edicion, callback) =>{
    const filtroProducto = {_id: new ObjectId(id)}
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getDB()
    await baseDeDatos.collection('usuarios')
    .findOneAndUpdate(
        filtroProducto, 
        operacion, 
        {upsert:true, returnOriginal: true },callback);
};

const eliminarUsuario = async(id,callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const baseDeDatos = getDB()
    baseDeDatos.collection('usuarios').deleteOne(filtroProducto,callback);
};

export {obtenerUsuarios, crearUsuarios, editarUsuarios, eliminarUsuario};