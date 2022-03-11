// importación con nombre {}
const { validateJWT } = require('../helpers/jwt');
const {io} = require('../index');
const {connectedUser, disconnectedUser, saveMessage} = require('../controllers/socketController');


// Mensajes de sockets
io.on('connection', client =>  {
    console.log('Cliente conectado');

    const [validToken, uid] = validateJWT(client.handshake.headers['x-token']);
    console.log(validToken, uid);
    
    /// verifica autenticación

    if(!validToken){
      return client.disconnect();
    }

    ///cliente autenticado
    connectedUser(uid);


    /// Ingresar al usuario en una sala específica
    /// sala global, para mensaje privado a un cliente, sería con client.id
    client.join(uid);
    /// mensaje a una persona en particular
    // client.to(uid).emit('');

    /// escuchar del cliente el mensaje personal
    client.on('personal-message', async (payload) => {
      console.log(payload);
      await saveMessage(payload);
      io.to(payload.to).emit('personal-message', payload);
    });

    /// Cliente desconectado
    client.on('disconnect', () => { 
      disconnectedUser(uid);
    });

  });
