// parecido a una importación en flutter
const express = require('express');
const path = require('path');
require('dotenv').config();

// Configuración de base de datos
const {dbConnection} = require('./database/config').dbConnection();

// aplicación de express
const app = express();

// lectura y parseo de la información del body de una petición HTTP
app.use(express.json());


// Node sockets server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// directorio publico (para cuando se emigre a un dominio y se tenga que actualizar 
// puerto constantemente)
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


// Definición de rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));


server.listen(process.env.PORT, (error)=>{
    if ( error ) throw new Error(error);
    console.log(`Servidor corriendo en puerto`, process.env.PORT);
});
