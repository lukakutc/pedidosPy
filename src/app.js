const express = require('express')
const db = require('./database')
const app = express()

app.use(express.json()) // permite recibir JSON en los requests

//ENDPOINTS

//PEDIDOS. el nombre es generico y despues se le van añadiendo las otras cuestiones, como filtros, selecciones, etc.
app.get('/pedidos', (req, res) => {
  const pedidos = db.prepare('SELECT * FROM pedido').all() //db.prepare . all me devuelve TODOS los resultados
  res.json(pedidos) //res devuelve un json con pedidos. pero db.prepare devuelve un array, res.json automaticamente convierte a json
})
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





const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})



