import Express from 'express';
import { crearVenta, editarVenta, eliminarVenta, obtenerVentas } from '../../controller/ventas/controller.js';

const rutasVentas = Express.Router();

const generalCallback = (res) => (err,result) =>{
    if (err) {
        res.status(500).send('Error consultando los vehiculos');
    }else{
        res.json(result);
    }
};

rutasVentas.route('/ventas').get((req,res)=>{
    console.log('alguien hizo get en la ruta /ventas');
    obtenerVentas(generalCallback(res));
    
});

rutasVentas.route('/ventas').post((req,res)=>{
    // implemntar codigo para crear un producto
    crearVenta(req.body, generalCallback(res));
    
});
rutasVentas.route('/ventas/:id').patch((req,res) => {
    editarVenta(req.params.id, req.body, generalCallback(res));
})
rutasVentas.route('/ventas/:id').delete((req,res) =>{
    eliminarVenta(req.body.id,generalCallback(res));

});

export default rutasVentas;