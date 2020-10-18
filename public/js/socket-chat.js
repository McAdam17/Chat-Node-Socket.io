let socket = io();
let params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location='index.html';
    throw  new Error('El nombre y la sala son requieridos');
}
if(params.get('nombre')=='' || params.get('sala')==''){
    window.location='index.html';
    throw  new Error('El nombre y la sala son requieridos'); 
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//Los on sivern más para escuchar
socket.on('connect',()=>{
    console.log('Connected to server');
    socket.emit('entrarChat',usuario, function(data){
        console.log(data);
    });
});
socket.on('disconnect',()=>{
    console.log('Disconnected to server');
});


//Esuhar mensaje del servidor 
socket.on('crearMensaje', (mensaje)=>{
    console.log('Server: ', mensaje);
});

//Esuhar mensaje del servidor listaPersonas
socket.on('listaPersonas', (usuarios)=>{
    console.log(usuarios);
});

//Mensajes privados
 socket.on('mensajePrivado', (mensaje) =>{
     console.log('Mensaje:', mensaje);
 });
