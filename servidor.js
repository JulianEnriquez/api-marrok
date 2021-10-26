import  Express  from "express";
import Cors from 'cors';
import { conectarBD } from "./db/db.js";
import rutasProducto from "./views/productos/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";
import rutasUsuarios from "./views/usuarios/rutas.js";

const port = process.env.PORT || 5050
const app = Express();  

app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);
app.use(rutasVentas);
app.use(rutasUsuarios);

const main = ()=>{
    return app.listen(port,()=>{
        console.log(`Escuchando puerto ${port}`);
    });     
};

conectarBD(main);
