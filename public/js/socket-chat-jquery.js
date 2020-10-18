let params = new URLSearchParams(window.location.search);

// Referencias txtMensaje
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');



if(!params.has('nombre') || !params.has('sala')){
    window.location='index.html';
    throw  new Error('El nombre y la sala son requieridos');
}
if(params.get('nombre')=='' || params.get('sala')==''){
    window.location='index.html';
    throw  new Error('El nombre y la sala son requieridos'); 
}


// Funciones para renderizar usuarios

function renderizarUsuarios(personas) { //[{},{},{}]

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>'+params.get('sala')+'</span></a>';
    html += '</li>';
    personas.forEach(persona => {
        html += '<li>'
        html += '<a data-id="'+persona.id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+persona.nombre+'<small class="text-success">online</small></span></a>'
        html += '</li>'
    });

    const tituloSala = document.getElementById('tituloSalaFinal');
    tituloSala.textContent = params.get('sala');

    divUsuarios.html(html);
}


function renderizarMensajes(mensaje, selft) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if(mensaje.nombre==='Administrador'){
        adminClass = 'danger';
    }

    if(selft){
        html += '<li class="reverse animated fadeIn">';
        html += '<div class="chat-content">';
        html += '<h5>'+mensaje.nombre+'</h5>';
        html += '<div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">'+hora+'</div>';
        html += '</li>';
        
    }else{
        html += '<li class="animated fadeIn">';
        if(mensaje.nombre!='Administrador')
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += '<h5>'+mensaje.nombre+'</h5>';
        html += '<div class="box bg-light-'+adminClass+'">'+mensaje.mensaje+'</div>';
        html += '</div>';
        html += '<div class="chat-time">'+hora+'</div>';
        html += '</li>';
    }
    divChatbox.append(html);

    scrollBottom();
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}



//Listeners

divUsuarios.on('click','a',function(){
    var id = $(this).data('id');
    if(id){
        console.log(id);
    }
});

formEnviar.on('submit',function(e){
    e.preventDefault();
    const contenido = txtMensaje.val();

    if(contenido.trim().length === 0){
        return;
    }

    socket.emit('crearMensaje', {
        nombre: usuario.nombre,
        mensaje: contenido
    }, function(resp){
        txtMensaje.val("").focus();
        renderizarMensajes(resp,true);
    });

    
});
