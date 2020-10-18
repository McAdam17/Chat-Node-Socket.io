let socket = io();


let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//Los on sivern más para escuchar
socket.on('connect',()=>{
    console.log('Connected to server');
    socket.emit('entrarChat',usuario, function(data){
        renderizarUsuarios(data);
    });
});
socket.on('disconnect',()=>{
    console.log('Disconnected to server');
});


//Esuhar mensaje del servidor 
socket.on('crearMensaje', (mensaje)=>{
    renderizarMensajes(mensaje,false);
});

//Esuhar mensaje del servidor listaPersonas
socket.on('listaPersonas', (usuarios)=>{
    renderizarUsuarios(usuarios);
});

//Mensajes privados
 socket.on('mensajePrivado', (mensaje) =>{
     console.log('Mensaje:', mensaje);
 });
