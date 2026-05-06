const db = require("./database");
const Database = require('better-sqlite3')

const csv = `Artículo	Descripción del Artículo	U.M.	Cantidad	Precio	% Dto.	Importe	A Reparto	Fecha de Entrega	Cantidad a Remitir	Detalle
ALM001	AZUCAR LEDESMA 1KG LIBRE GLUT	Unidad	1.000,00	1.314,05	 	1.314.050,00	No seleccionado		0,00	
ALM001	LECHE PURISIMA 800G ENTERA CAJA	Unidad	400,00	8.256,20	 	3.302.480,00	No seleccionado		0,00	
ALM001	VASO TERMICO *25U 240CC	Unidad	80,00	4.289,26	 	343.140,80	No seleccionado		0,00	
ALM001	TE TARAGUI  25S ENSOBRADO INTERNACIONAL	Unidad	120,00	3.214,88	 	385.785,60	No seleccionado		0,00	
ALM001	MATE COC.TARAGUI  25S SIN ENSOBRAR	Unidad	120,00	1.644,63	 	197.355,60	No seleccionado		0,00	
ALM001	YERBA PLAYADITO 500G	Unidad	1.000,00	2.140,50	 	2.140.500,00	No seleccionado		0,00	
ALM001	GALL.BAGLEY 400G SURTIDO 	Unidad	1.000,00	2.519,83	 	2.519.830,00	No seleccionado		0,00	
ALM001	GALL TRAVIATA 324G	Unidad	700,00	1.446,20	 	1.012.340,00	No seleccionado		0,00	
`

const lineas = csv.split('\n');

//nexion siempre que copias y pegas, te trae una primer fila que son los nombres de las columnas/atributos.
//esto quiere decir que podemos hacer una validacion previa con esto y guardar lo que necesitamos!

// aca desarrollamos la logica y despues vamos vvvvvvvvvviendo que onda. 
//trabajamos con la primer linea:
const atributos = lineas[0].split('\t')
let posicionCod, posicionDesc, posicionCant
atributos.forEach((atributo) => {
    if (atributo == 'Artículo') {
        posicionCod = atributos.indexOf(atributo)
        console.log('cod articulo Encontrado en ' + posicionCod)
    }
    else if (atributo == 'Descripción del Artículo') {
        posicionDesc = atributos.indexOf(atributo)
        console.log('descripcion encontrado en ' + posicionDesc)
    } else if (atributo == 'Cantidad'){
        posicionCant = atributos.indexOf(atributo)
        console.log(' Cantidad encontrado en pos '+posicionCant)
    }
    })

//una vez encontrada las posiciones de los atributos podemos trabajar con todas las lineas
const listaPanaderia = []
const listaFiambreria = []
const listaAlmacen = []
const listaVerduleria = []
const listaCarniceria = []
//aca seria, si el articulo en la base de datos NO pertenece 
lineas.forEach((linea)=>{
    //Cada articulo en realidad es una linea y hay que convertirlo a articulo primero
    const articulo = linea.split('\t')
    const codArticulo = articulo.at(0)
    console.log('codigo  ?  '+codArticulo)
    const consulta = db.prepare(`SELECT id_articulo,sector FROM articulo WHERE id_articulo = ?`).all(codArticulo)
    console.log('cantidad de articulos devueltos por la consulta: '+consulta.length)
    console.log('Resultado de la consulta '+consulta)
    
    //si la consulta devolvio un articulo
    if(consulta.length>0){
        //me fijo el sector del articulo y lo añado a la lista.
        //se encuentra en la segunda posicion (id_articulo,sector)
        const sectorArticulo = consulta[1]  
        console.log('Sector del articulo: '+consulta[0]+' es: '+sectorArticulo)
    }else{

    }
    
})


