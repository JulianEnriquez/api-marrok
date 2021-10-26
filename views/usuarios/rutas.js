import Express from 'express';
import { crearUsuarios, editarUsuarios, eliminarUsuario, obtenerUsuarios } from '../../controller/Usuarios/controller.js';

const rutasUsuarios = Express.Router();

const generalCallback = (res) => (err,result) =>{
    if (err) {
        res.status(500).send('Error consultando los usuarios');
    }else{
        res.json(result);
    }
};
rutasUsuarios.route('/usuarios').get((req,res)=>{
    console.log('alguien hizo get en la ruta /usuarios');
    obtenerUsuarios(generalCallback(res));
    
});
rutasUsuarios.route('/usuarios').post((req,res)=>{
    // implemntar codigo para crear un producto
    crearUsuarios(req.body, generalCallback(res));
    
});
rutasUsuarios.route('/usuarios/:id').patch((req,res) => {
    editarUsuarios(req.params.id, req.body, generalCallback(res));
});
rutasUsuarios.route('/usuarios/:id').delete((req,res) =>{
    eliminarUsuario(req.body.id,generalCallback(res));

});

export default rutasUsuarios;