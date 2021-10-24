import Express from 'express';
import { crearProdcuto, editarProducto, eliminarProducto, obtenerProductos } from '../../controller/productos/controller.js';


const rutasProducto = Express.Router();

const generalCallback = (res) => (err,result) =>{
    if (err) {
        res.status(500).send('Error consultando los vehiculos');
    }else{
        res.json(result);
    }
};

rutasProducto.route('/productos').get((req,res)=>{
    console.log('alguien hizo get en la ruta /vehiculos');
    obtenerProductos(generalCallback(res));
    
});

rutasProducto.route('/productos').post((req,res)=>{
    // implemntar codigo para crear un producto
    crearProdcuto(req.body, generalCallback(res));
    
});

rutasProducto.route('/productos/:id').patch((req,res) => {
    editarProducto(req.params.id, req.body, generalCallback(res));
})

rutasProducto.route('/productos/:id').delete((req,res) =>{
    eliminarProducto(req.body.id,generalCallback(res));

});

export default rutasProducto;
