// Se va a encargar de todas las personas conectadas

class Usuarios {
    constructor(){
        this.personas = [];
    }

    agregarPersona(id,nombre,sala){
        this.personas.push({id,nombre,sala});
        return this.personas;
    }

    obtenerPersona(id){
        return this.personas.filter(persona => persona.id === id)[0];
    }

    obtenerPersonas(){
        return this.personas;
    }

    obtenerPersonaPorSala(sala){
        return this.personas.filter(persona => persona.sala === sala);
    }

    borrarPersona(id){
        const personaBorrada = this.obtenerPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }
}


module.exports = {
    Usuarios
}