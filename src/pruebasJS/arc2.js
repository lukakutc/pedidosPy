const {persona1,persona2,persona3,personas} = require('./arc1')
//si. esta perfecto entonces eso 
console.log(`Importamos las personas??
    persona1: ${persona1.nombre}
    persona2: ${persona2.nombre}
    persona3: ${persona3.nombre}
    `)


    personas.forEach( (persona)=>{
        console.log(persona.edad)
        console.log(persona.apellido)
        console.log(persona.nombre)
    })


