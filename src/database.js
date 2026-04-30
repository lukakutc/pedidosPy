const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, '../gp.db'))

db.pragma('journal_mode = WAL') // mejora la performance
db.pragma('foreign_keys = ON')  // activa las foreign keys de tu esquema
/*db.exec(`CREATE TABLE "sector" (
	"sector"	TEXT,
 	PRIMARY KEY("sector")
);
CREATE TABLE "cliente" (
	"cuit"	TEXT,
	"razon_social"	TEXT,
	PRIMARY KEY("cuit")
);

CREATE TABLE "usuario" (
	"username"	TEXT,
	"nombre"	TEXT,
	"apellido"	TEXT,
	"password"	TEXT,
	"sector"	TEXT,
	PRIMARY KEY("username","sector"),
	FOREIGN KEY("sector") REFERENCES "sector"("sector")
);
CREATE TABLE "articulo" (
	"id_articulo"	TEXT,
	"descripcion"	TEXT,
	"sector"	TEXT,
	PRIMARY KEY("id_articulo"),
	FOREIGN KEY("sector") REFERENCES "sector"("sector")
);
CREATE TABLE "pedido" (
	"id_pedido"	INTEGER,
	"estado"	TEXT DEFAULT 'CREADO',
	"cuit"   TEXT,
	"fecha_creacion"	TEXT,
	"fecha_finalizacion"	TEXT,
	"prioridad"	INTEGER,
	PRIMARY KEY("id_pedido" AUTOINCREMENT),
	FOREIGN KEY("cuit") REFERENCES "cliente"("cuit"),
	CONSTRAINT "check_estado" CHECK("estado" IN ('CREADO', 'RECIBIDO', 'LISTO')),
	CONSTRAINT "check_prioridad" CHECK("prioridad" IN (1, 0))
);
CREATE TABLE "parte" (
	"id_pedido"	INTEGER,
	"sector"	TEXT,
	"usuario_procesador"	TEXT,
	"estado"	TEXT DEFAULT 'CREADO',
	"fecha_creacion"	TEXT,
	"fecha_finalizacion"	TEXT,
	"nombre_persona_proceso" TEXT,
	PRIMARY KEY("id_pedido","sector"),
	FOREIGN KEY("id_pedido") REFERENCES "pedido"("id_pedido"),
	FOREIGN KEY("sector") REFERENCES "sector"("sector"),
	FOREIGN KEY("usuario_procesador","sector") REFERENCES "usuario"("username","sector"),
	CHECK("estado" IN ('CREADO', 'RECIBIDO', 'LISTO'))
);
CREATE TABLE "articulo_de_parte" (
	"id_articulo"	TEXT,
	"id_pedido"	INTEGER,
	"sector"	TEXT,
	PRIMARY KEY("id_articulo","sector","id_pedido"),
	FOREIGN KEY("id_pedido","sector") REFERENCES "parte"("id_pedido","sector"),
	FOREIGN KEY("id_articulo") REFERENCES "articulo"("id_articulo")
);`); // ejecuta el script de creación de tablas y datos iniciales
*/
module.exports = db