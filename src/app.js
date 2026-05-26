const express = require('express')
const db = require('./database')
const app = express()
const path = require('path')

app.use(express.json()) // permite recibir JSON en los requests

//ENDPOINTS

//articulos
//devuelve todos los articulos
// Devuelve todos los artículos
app.get('/articulos', (req, res) => {
  try {
    const articulos = db.prepare('SELECT * FROM articulo').all()
    return res.json(articulos)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno al consultar artículos' })
  }
})

// Devuelve un artículo específico
app.get('/articulos/:id', (req, res) => {
  try {
    const articulo = db.prepare('SELECT * FROM articulo WHERE id_articulo = ?').get(req.params.id)
    
    if (!articulo) {
      return res.status(404).json({ error: 'No se encuentra el artículo' }) // <-- Return obligatorio
    }
    return res.json(articulo)
  } catch (error) {
    return res.status(500).json({ error: 'Error interno al consultar el artículo' })
  }
})

// Crea un artículo
app.post('/articulos/', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'No se ha enviado un artículo' })
  }

  const { id_articulo, descripcion, sector } = req.body

  if (!id_articulo || !descripcion || !sector) {
    return res.status(400).json({ 
      error: `Falta: id_articulo:${!!id_articulo}, descripcion:${!!descripcion}, sector:${!!sector}` 
    })
  }

  // Normalización inicial para evitar procesamiento redundante
  const idNorm = id_articulo.toString().trim()
  const descNorm = descripcion.toString().trim().toUpperCase()
  const sectorNorm = sector.toString().trim().toUpperCase()

  try {
    const existeArticulo = db.prepare('SELECT 1 FROM articulo WHERE id_articulo = ?').get(idNorm)
    if (existeArticulo) {
      return res.status(409).json({ error: 'Ya existe un artículo con ese ID' })
    }

    const validarSector = db.prepare('SELECT 1 FROM sector WHERE sector = ?').get(sectorNorm)
    if (!validarSector) {
      return res.status(400).json({ error: `No existe el sector: ${sectorNorm}` })
    }

    // Declaración explícita de columnas
    db.prepare('INSERT INTO articulo (id_articulo, descripcion, sector) VALUES (?, ?, ?)')
      .run(idNorm, descNorm, sectorNorm)

    return res.status(201).json({ ok: 'Artículo creado exitosamente' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno al crear el artículo' })
  }
})
//--------------------------------------------------------------------------------------------------------------------------------------
//PEDIDOS
//PEDIDOS. DEVUELVE TODOS LOS PEDIDOS.
//CREAR UN PEDIDO
app.post('/pedidos',(req,res)=>{
  //si body vacio
  if(!req.body)
    return res.status(400).json({error:"No ingresaste los parametros correctamente"})
  
  //desestructuramos el body en variables
  //esquema en DB: pedido(id_pedido(autoincremental),estado(por defecto CREADO),cuit,fecha_creacion,fecha_finalizacion,prioridad)
  const {}

})




app.get('/pedidos', (req, res) => {
  const pedidos = db.prepare('SELECT * FROM pedido').all() //db.prepare . all me devuelve TODOS los resultados
  res.json(pedidos) //res devuelve un json con pedidos. pero db.prepare devuelve un array, res.json automaticamente convierte a json
})

//DEVUELVE UN PEDIDO
app.get('/pedidos/:id', (req, res) => {
  //no es req.id. es req.params.id. y params es lo que entra desde el navegador
  const pedido = db.prepare('SELECT * FROM pedido WHERE id_pedido = ?').get(req.params.id)
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' })
  }
  res.json(pedido)
})

//PARTES DE PEDIDOS
app.get('/pedidos/:id/partes/:sector', (req, res) => {
  //esto es una desestructuracion. asigno lo que esta en req.params que es una tupla de id y sector
  let { id, sector } = req.params
  //normalizo sector
  sector = sector.toUpperCase();
  console.log(req.params)
  const parte = db.prepare(`SELECT * FROM parte WHERE id_pedido = ? AND sector = ?`).get(id, sector)
  if (!parte) {
    return res.status(404).json({ error: `No encontramos la parte ${sector} del pedido ${id}` })
  }
  res.json(parte)
})

//aca vamos a hacer la funcion de procesar el csv.














const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})



