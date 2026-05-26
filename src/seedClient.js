// Paso 1 — leer el archivo del disco y obtener el contenido como string
const fs = require('fs')  // file system para poder interactuar con los archivos
const db = require('./database') //db para poder utilizar la base de datos
const csv = fs.readFileSync('../clientes.csv', 'utf-8') // lee el archivo y lo guarda como string

const lineas= csv.split('\n')
//ahora quito la ultima linea que es vacia
lineas.pop()
//ahoar saco la primer linea (header)
const clientes = lineas.splice(2,lineas.length-1)



let i = 0;
for(const cliente of clientes){
  //cada articulo hasta ahora es un dato del array, es decir una linea del string csv
  //dividimos por ; y desestructuramos
  //orden N° de Cuenta	Nombre de la Cuenta	Categoría de IVA	N° CUIT/Doc.	Vendedor	Grupo
  const clienteProcesado = cliente.trim().split(';')
  //se copia un caracter de mas \r en el sector entonces primero limpio antes de insertar
  
  console.log(db.prepare('INSERT OR IGNORE INTO cliente VALUES(?,?)').run(clienteProcesado[3].trim(),clienteProcesado[1].trim()))
  console.log(`archivo ${i} procesado`)
  i++
}