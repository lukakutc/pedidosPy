/*console.log("se lee esto o que?")
const objeto = {pedido: 1, estado: "CREADO",cliente: "1112331"} 
console.log("Objeto sin pasar a json: "+objeto)
//si hacemos console log objeto si se ve el objteo
console.log("Objeto sin concatenar XD")
console.log(objeto)
const jsonObjeto = JSON.stringify(objeto)
console.log("Objetjo stringifiado: "+jsonObjeto)
*/
//variables, let y const

/*const a = 10
const b = 30
function suma() {
    //a y b declaradas FUERA de la funcion son alcanzadas dentro de la funcion
    console.log(a+b)
    const c = 40
    const d = 60
    let e = 40
    let f = 60
}
//no es valido, c y d tienen alcance en la funcion
//console.log(c+d)

console.log(e+f)
*/
const pedido = {id: 1, estado: 'CREADO', clientes: ['1','2','11223333122',4]}

console.log("pedido: ")
console.log(pedido)
console.log("estado de pedido",pedido.estado)
console.log("clientes de pedido: ",pedido.clientes)
const pedidos = 
[{id: 1, estado: 'CREADO', clientes: ['1','2','11223333122',4],precio:1223232},
{id:2,estado:'PREPARADO', clientes:['2','5','7'],precio:20},
{id:3,estado:'LISTO', clientes:['909012'],precio:500}]

//devolver todos los clientes de cada pedido
//dale papa volvimos a primer año, funcion es caja negra!
let total = 0;
for(const pedido of pedidos){
    total += pedido.precio 
}
console.log("total: ",total)
//como arrow function y como function
function calculaTotal(pedidos){
    let total = 0
    for(i=0;i<pedidos.length;i++){
        total += pedidos[i].precio; 
        console.log("dentro de calculaTotal")
    }
    return total
}
console.log("total calculaTotal")
console.log(calculaTotal(pedidos))
// y ahora como arrow function?

arrFuncion = (pedidos)=>{
    let total = 0
    for(pedido of pedidos){
        total+=pedido.precio
    }
    console.log("Dentro de arrow function")    
    return total;
}
console.log("total arrow: ")
console.log(arrFuncion)

//uso de filter all
const jugadorLuca = {nombre: 'luca',goles:10}
const jugadores = [{nombre: 'luca',goles:10},{nombre: 'rami',goles:3},{nombre: 'nico',goles:6}]
const goleadores = jugadores.filter((jugador)=> jugador.goles>=4)
console.log(goleadores)
 
jugadorLuca

//uso de flat: basicamente,"aplanar arreglo", es decir desanidar arreglos
//un unico flat aplana un nivel. el argumento que recibe la funcion es cuantas veces queremos flatear
const arr2 = [0, 1, [2, [3, [4, 5]]]];
console.log(arr2.flat());
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]
console.log(arr2.flat(2));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]
