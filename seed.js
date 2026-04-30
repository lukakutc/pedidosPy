const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'gp.db'))
db.pragma('foreign_keys = ON')

// Limpiar tablas en orden correcto (por las foreign keys)
db.prepare('DELETE FROM articulo_de_parte').run()
db.prepare('DELETE FROM parte').run()
db.prepare('DELETE FROM pedido').run()
db.prepare('DELETE FROM articulo').run()
db.prepare('DELETE FROM usuario').run()
db.prepare('DELETE FROM cliente').run()
db.prepare('DELETE FROM sector').run()

console.log('Tablas limpiadas')

// ─── SECTORES ───────────────────────────────────────────────
const insertSector = db.prepare('INSERT INTO sector VALUES (?)')

insertSector.run('ALMACEN')
insertSector.run('VERDULERIA')
insertSector.run('CARNICERIA')
insertSector.run('PANADERIA')
insertSector.run('FIAMBRERIA')

console.log('✓ Sectores insertados')

// ─── CLIENTES ───────────────────────────────────────────────
const insertCliente = db.prepare('INSERT INTO cliente VALUES (?, ?)')

insertCliente.run('20-11111111-1', 'Restaurante El Parrillón SRL')
insertCliente.run('20-22222222-2', 'Hotel Gran Buenos Aires SA')
insertCliente.run('20-33333333-3', 'Catering Norte SRL')
insertCliente.run('20-44444444-4', 'Supermercado La Esquina SA')
insertCliente.run('20-55555555-5', 'Comedor Industrial Petrogas SRL')

console.log('✓ Clientes insertados')

// ─── USUARIOS ───────────────────────────────────────────────
const insertUsuario = db.prepare('INSERT INTO usuario VALUES (?, ?, ?, ?, ?)')

// Un usuario por sector (modelo actual)
insertUsuario.run('almacen01',    'Roberto',  'Sánchez',  '1234', 'ALMACEN')
insertUsuario.run('verduleria01', 'María',    'González', '1234', 'VERDULERIA')
insertUsuario.run('carniceria01', 'Diego',    'Martínez', '1234', 'CARNICERIA')
insertUsuario.run('panaderia01',  'Claudia',  'López',    '1234', 'PANADERIA')
insertUsuario.run('fiambreria01', 'Marcelo',  'Fernández','1234', 'FIAMBRERIA')

// Usuario de ventas — sector ALMACEN como sector base (podría tener su propio sector)
insertUsuario.run('ventas01', 'Laura', 'Pérez', '1234', 'ALMACEN')

console.log('✓ Usuarios insertados')

// ─── ARTÍCULOS ──────────────────────────────────────────────
const insertArticulo = db.prepare('INSERT INTO articulo VALUES (?, ?, ?)')

// ALMACEN
insertArticulo.run('ALM001', 'Arroz largo fino 1kg',         'ALMACEN')
insertArticulo.run('ALM002', 'Fideos spaghetti 500g',        'ALMACEN')
insertArticulo.run('ALM003', 'Aceite girasol 1.5L',          'ALMACEN')
insertArticulo.run('ALM004', 'Harina 000 1kg',               'ALMACEN')
insertArticulo.run('ALM005', 'Azúcar blanca 1kg',            'ALMACEN')
insertArticulo.run('ALM006', 'Sal fina 500g',                'ALMACEN')
insertArticulo.run('ALM007', 'Puré de tomate 520g',          'ALMACEN')
insertArticulo.run('ALM008', 'Lentejas 500g',                'ALMACEN')

// VERDULERIA
insertArticulo.run('VER001', 'Tomate perita x kg',           'VERDULERIA')
insertArticulo.run('VER002', 'Lechuga criolla x unidad',     'VERDULERIA')
insertArticulo.run('VER003', 'Cebolla x kg',                 'VERDULERIA')
insertArticulo.run('VER004', 'Papa x kg',                    'VERDULERIA')
insertArticulo.run('VER005', 'Zanahoria x kg',               'VERDULERIA')
insertArticulo.run('VER006', 'Morrón rojo x kg',             'VERDULERIA')
insertArticulo.run('VER007', 'Zapallo anco x kg',            'VERDULERIA')
insertArticulo.run('VER008', 'Limón x kg',                   'VERDULERIA')

// CARNICERIA
insertArticulo.run('CAR001', 'Asado x kg',                   'CARNICERIA')
insertArticulo.run('CAR002', 'Vacío x kg',                   'CARNICERIA')
insertArticulo.run('CAR003', 'Pollo entero x unidad',        'CARNICERIA')
insertArticulo.run('CAR004', 'Carne picada común x kg',      'CARNICERIA')
insertArticulo.run('CAR005', 'Costilla de cerdo x kg',       'CARNICERIA')
insertArticulo.run('CAR006', 'Chorizo parrillero x kg',      'CARNICERIA')
insertArticulo.run('CAR007', 'Milanesa de nalga x kg',       'CARNICERIA')

// PANADERIA
insertArticulo.run('PAN001', 'Pan francés x kg',             'PANADERIA')
insertArticulo.run('PAN002', 'Pan de molde lactal x unidad', 'PANADERIA')
insertArticulo.run('PAN003', 'Medialunas x docena',          'PANADERIA')
insertArticulo.run('PAN004', 'Facturas surtidas x docena',   'PANADERIA')
insertArticulo.run('PAN005', 'Pan rallado 500g',             'PANADERIA')
insertArticulo.run('PAN006', 'Tostadas x paquete',           'PANADERIA')

// FIAMBRERIA
insertArticulo.run('FIA001', 'Jamón cocido x kg',            'FIAMBRERIA')
insertArticulo.run('FIA002', 'Salame milano x kg',           'FIAMBRERIA')
insertArticulo.run('FIA003', 'Queso cremoso x kg',           'FIAMBRERIA')
insertArticulo.run('FIA004', 'Queso pategrás x kg',          'FIAMBRERIA')
insertArticulo.run('FIA005', 'Mortadela x kg',               'FIAMBRERIA')
insertArticulo.run('FIA006', 'Paleta cocida x kg',           'FIAMBRERIA')

console.log('✓ Artículos insertados')

// ─── PEDIDOS ────────────────────────────────────────────────
const insertPedido = db.prepare(`
  INSERT INTO pedido (estado, cuit, fecha_creacion, fecha_finalizacion, prioridad)
  VALUES (?, ?, ?, ?, ?)
`)

// Pedido 1 — LISTO (ya finalizado)
const p1 = insertPedido.run('LISTO', '20-11111111-1', '2024-01-10', '2024-01-10', 0)

// Pedido 2 — CREADO (recién ingresado, alta prioridad)
const p2 = insertPedido.run('CREADO', '20-22222222-2', '2024-01-15', null, 1)

// Pedido 3 — CREADO (normal)
const p3 = insertPedido.run('CREADO', '20-33333333-3', '2024-01-15', null, 0)

// Pedido 4 — RECIBIDO (en preparación)
const p4 = insertPedido.run('RECIBIDO', '20-44444444-4', '2024-01-14', null, 0)

// Pedido 5 — CREADO (alta prioridad)
const p5 = insertPedido.run('CREADO', '20-55555555-5', '2024-01-15', null, 1)

const id1 = p1.lastInsertRowid
const id2 = p2.lastInsertRowid
const id3 = p3.lastInsertRowid
const id4 = p4.lastInsertRowid
const id5 = p5.lastInsertRowid

console.log('✓ Pedidos insertados')

// ─── PARTES ─────────────────────────────────────────────────
const insertParte = db.prepare(`
  INSERT INTO parte (id_pedido, sector, usuario_procesador, estado, fecha_creacion, fecha_finalizacion, nombre_persona_proceso)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

// Partes del pedido 1 (LISTO — todas las partes finalizadas)
insertParte.run(id1, 'ALMACEN',    'almacen01',    'LISTO', '2024-01-10', '2024-01-10', 'Roberto Sánchez')
insertParte.run(id1, 'CARNICERIA', 'carniceria01', 'LISTO', '2024-01-10', '2024-01-10', 'Diego Martínez')
insertParte.run(id1, 'PANADERIA',  'panaderia01',  'LISTO', '2024-01-10', '2024-01-10', 'Claudia López')

// Partes del pedido 2 (CREADO — ninguna parte recibida aún)
insertParte.run(id2, 'VERDULERIA', 'verduleria01', 'CREADO', '2024-01-15', null, null)
insertParte.run(id2, 'CARNICERIA', 'carniceria01', 'CREADO', '2024-01-15', null, null)
insertParte.run(id2, 'FIAMBRERIA', 'fiambreria01', 'CREADO', '2024-01-15', null, null)

// Partes del pedido 3 (CREADO)
insertParte.run(id3, 'ALMACEN',    'almacen01',    'CREADO', '2024-01-15', null, null)
insertParte.run(id3, 'PANADERIA',  'panaderia01',  'CREADO', '2024-01-15', null, null)

// Partes del pedido 4 (RECIBIDO — algunas partes listas, otras en proceso)
insertParte.run(id4, 'ALMACEN',    'almacen01',    'LISTO',    '2024-01-14', '2024-01-14', 'Roberto Sánchez')
insertParte.run(id4, 'VERDULERIA', 'verduleria01', 'RECIBIDO', '2024-01-14', null,         'María González')
insertParte.run(id4, 'CARNICERIA', 'carniceria01', 'CREADO',   '2024-01-14', null,         null)

// Partes del pedido 5 (CREADO — alta prioridad, todos los sectores)
insertParte.run(id5, 'ALMACEN',    'almacen01',    'CREADO', '2024-01-15', null, null)
insertParte.run(id5, 'VERDULERIA', 'verduleria01', 'CREADO', '2024-01-15', null, null)
insertParte.run(id5, 'CARNICERIA', 'carniceria01', 'CREADO', '2024-01-15', null, null)
insertParte.run(id5, 'PANADERIA',  'panaderia01',  'CREADO', '2024-01-15', null, null)
insertParte.run(id5, 'FIAMBRERIA', 'fiambreria01', 'CREADO', '2024-01-15', null, null)

console.log('✓ Partes insertadas')

// ─── ARTÍCULOS DE PARTE ─────────────────────────────────────
const insertADP = db.prepare(`
  INSERT INTO articulo_de_parte (id_articulo, id_pedido, sector)
  VALUES (?, ?, ?)
`)

// Pedido 1
insertADP.run('ALM001', id1, 'ALMACEN')
insertADP.run('ALM003', id1, 'ALMACEN')
insertADP.run('CAR001', id1, 'CARNICERIA')
insertADP.run('CAR003', id1, 'CARNICERIA')
insertADP.run('PAN001', id1, 'PANADERIA')

// Pedido 2
insertADP.run('VER001', id2, 'VERDULERIA')
insertADP.run('VER003', id2, 'VERDULERIA')
insertADP.run('VER004', id2, 'VERDULERIA')
insertADP.run('CAR002', id2, 'CARNICERIA')
insertADP.run('CAR006', id2, 'CARNICERIA')
insertADP.run('FIA001', id2, 'FIAMBRERIA')
insertADP.run('FIA003', id2, 'FIAMBRERIA')
insertADP.run('FIA004', id2, 'FIAMBRERIA')

// Pedido 3
insertADP.run('ALM002', id3, 'ALMACEN')
insertADP.run('ALM004', id3, 'ALMACEN')
insertADP.run('ALM007', id3, 'ALMACEN')
insertADP.run('PAN002', id3, 'PANADERIA')
insertADP.run('PAN003', id3, 'PANADERIA')

// Pedido 4
insertADP.run('ALM001', id4, 'ALMACEN')
insertADP.run('ALM005', id4, 'ALMACEN')
insertADP.run('ALM006', id4, 'ALMACEN')
insertADP.run('VER002', id4, 'VERDULERIA')
insertADP.run('VER005', id4, 'VERDULERIA')
insertADP.run('CAR004', id4, 'CARNICERIA')
insertADP.run('CAR007', id4, 'CARNICERIA')

// Pedido 5
insertADP.run('ALM003', id5, 'ALMACEN')
insertADP.run('ALM008', id5, 'ALMACEN')
insertADP.run('VER006', id5, 'VERDULERIA')
insertADP.run('VER007', id5, 'VERDULERIA')
insertADP.run('VER008', id5, 'VERDULERIA')
insertADP.run('CAR001', id5, 'CARNICERIA')
insertADP.run('CAR005', id5, 'CARNICERIA')
insertADP.run('PAN001', id5, 'PANADERIA')
insertADP.run('PAN004', id5, 'PANADERIA')
insertADP.run('FIA002', id5, 'FIAMBRERIA')
insertADP.run('FIA005', id5, 'FIAMBRERIA')
insertADP.run('FIA006', id5, 'FIAMBRERIA')

console.log('✓ Artículos de parte insertados')
console.log('')
console.log('Base de datos poblada correctamente.')
console.log(`  Sectores:           5`)
console.log(`  Clientes:           5`)
console.log(`  Usuarios:           6`)
console.log(`  Artículos:         35`)
console.log(`  Pedidos:            5`)
console.log(`  Partes:            13`)
console.log(`  Artículos de parte: ${12 + 8 + 5 + 7 + 12}`)
