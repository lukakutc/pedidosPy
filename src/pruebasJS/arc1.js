//Archivo 1 tiene variables

const persona1 = {nombre:'Luca',apellido:'Tocce',edad:24}
const persona2 = {nombre:'Vale',apellido:'Brust',edad:25}
const persona3 = {nombre:'Juan',apellido:'Rodriguez',edad:25}

const personas =[persona1,persona2,persona3]

for(persona of personas){
    const {nombre,apellido,edad} = persona
    console.log(nombre+' '+apellido+' '+edad+' ') 
}


module.exports = {persona1,persona2,persona3,personas}
