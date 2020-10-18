const {io} = require('../index');
const {Usuarios} = require('../classes/Usuarios');
const {crearMensaje} = require('../utils');

const usuarios = new Usuarios();

io.on('connection',(client)=>{
    client.on('entrarChat', (data,callback) => {
        if(!data.nombre || !data.sala){
            return callback({
                err: true,
                mensaje: "El nombre es necesario"
            });
        }

        client.join(data.sala);

        personas = usuarios.agregarPersona(client.id,data.nombre,data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.obtenerPersonaPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje',crearMensaje('Administrador',`El usuario ${data.nombre} ha ingresado al chat.`));

        callback(usuarios.obtenerPersonaPorSala(data.sala));
    });    

    client.on('crearMensaje', (data,callback) => { 
        const persona = usuarios.obtenerPersona(client.id);
        client.broadcast.to(persona.sala).emit('crearMensaje',crearMensaje(persona.nombre, data.mensaje));
        callback(crearMensaje(persona.nombre, data.mensaje));
    });

    client.on('disconnect', () => {
        const personaBorada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorada.sala).emit('crearMensaje',crearMensaje('Administrador',`El usuario ${personaBorada.nombre} ha abandonado el chat`));
        client.broadcast.to(personaBorada.sala).emit('listaPersonas', usuarios.obtenerPersonaPorSala(personaBorada.sala));

    });

    //Mensajes privados
    client.on('mensajePrivado', (data) => {
        const persona = usuarios.obtenerPersona(client.id);
        console.log(data.para);
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre, data.mensaje));
    });
});