import  Express  from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from "mongodb";

dotenv.config({path:'./.env'});

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {useNewUrlParser: true,useUnifiedTopology: true,});

let baseDeDatos;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get('/productos', (req,res)=>{
    console.log('alguien hizo get en la ruta /vehiculos');
    baseDeDatos.collection('productos')
    .find({})
    //.limit(50) Limite de datos que se extraen de la base de datos
    .toArray((err,result) =>{
        if (err) {
            res.status(500).send('Error consultando los vehiculos');
        }
        else{
            res.json(result);
        }
    });
});

app.post('/productos/nuevo', (req,res)=>{
    // implemntar codigo para crear un producto
    
    const datosProducto =req.body;
    console.log(datosProducto);
    try {
        if  (
            Object.keys(datosProducto).includes('id') &&
            Object.keys(datosProducto).includes('category') &&
            Object.keys(datosProducto).includes('estilo') &&
            Object.keys(datosProducto).includes('existencias') &&
            Object.keys(datosProducto).includes('costoProduccion') &&
            Object.keys(datosProducto).includes('valorVenta') &&
            Object.keys(datosProducto).includes('fechaIngreso') 
        ){
            baseDeDatos.collection('productos').insertOne(datosProducto, (err,result)=>{
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                }else{
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        }
         else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.patch('/productos/editar',(req,res) => {
    const edicion = req.body;

    const filtroProducto = {_id: new ObjectId( edicion.id)}
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }
    baseDeDatos.collection('productos')
    .findOneAndUpdate(
        filtroProducto, 
        operacion, 
        {upsert:true, returnOriginal: true }, 
        (err,result)=>{
            if (err) {
                console.error('error actualizando producto: ', err);
                res.sendStatus(500);
            }
            else{
                console.log('actualizado con exito');
                res.sendStatus(200);
            }
        }
    );
})

app.delete('/productos/eliminar', (req,res) =>{
    const filtroProducto = {_id: new ObjectId( req.body.id)}
    baseDeDatos.collection('productos').deleteOne(filtroProducto,(err,result) => {
        if (err) {
            console.error(err)
            res.sendStatus(500);
        } else {
            res.sendStatus(200)
        }
    });

});


const main = ()=>{

    client.connect((err, db)=>{
        if(err){
            console.log('Error conectando a la basa de datos');
        }
        baseDeDatos = db.db('Marrok');
        console.log('conexion exitosa');
        return app.listen(process.env.PORT,()=>{
            console.log(`Escuchando puerto ${process.env.PORT}`);
        
        });
    });

};

main();