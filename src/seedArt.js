// Paso 1 — leer el archivo del disco y obtener el contenido como string
const fs = require('fs')  // file system para poder interactuar con los archivos
const db = require('./database') //db para poder utilizar la base de datos
const csv = fs.readFileSync('../articulos.csv', 'utf-8') // lee el archivo y lo guarda como string

const lineas= csv.split('\n')
//ahora quito la ultima linea que es vacia
lineas.pop()
//ahoar saco la primer linea
const articulos = lineas.splice(2,lineas.length-1)




for(const articulo of articulos){
  //cada articulo hasta ahora es un dato del array, es decir una linea del string csv
  //dividimos por ; y desestructuramos
  //orden CODIGO;DESCRIPCION;SECTOR
  const artListo = articulo.trim().split(';')

  //se copia un caracter de mas \r en el sector entonces primero limpio antes de insertar
  
  console.log(db.prepare('INSERT INTO articulo VALUES(?,?,?)').run(artListo[0].trim(),artListo[1].trim(),artListo[2].trim()))
}