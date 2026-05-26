const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, '../gp.db'))

db.pragma('journal_mode = WAL') // mejora la performance
db.pragma('foreign_keys = ON')  // activa las foreign keys de tu esquema
/*db.exec(`PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

CREATE TABLE "sector" (
    "sector" TEXT,
    PRIMARY KEY("sector")
);

CREATE TABLE "cliente" (
    "cuit"         TEXT,
    "razon_social" TEXT NOT NULL,
    PRIMARY KEY("cuit")
);

CREATE TABLE "usuario" (
    "username" TEXT,
    "nombre"   TEXT,
    "apellido" TEXT,
    "password" TEXT,
    "sector"   TEXT NOT NULL,
    PRIMARY KEY("username"),
    FOREIGN KEY("sector") REFERENCES "sector"("sector")
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE "articulo" (
    "id_articulo" TEXT,
    "descripcion" TEXT,
    "sector"      TEXT NOT NULL,
    PRIMARY KEY("id_articulo"),
    FOREIGN KEY("sector") REFERENCES "sector"("sector")
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE "pedido" (
    "id_pedido"          INTEGER,
    "estado"             TEXT DEFAULT 'CREADO',
    "cuit"               TEXT NOT NULL,
    "fecha_creacion"     TEXT,
    "fecha_finalizacion" TEXT,
    "prioridad"          INTEGER,
    PRIMARY KEY("id_pedido" AUTOINCREMENT),
    FOREIGN KEY("cuit") REFERENCES "cliente"("cuit")
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT "check_estado"    CHECK("estado"    IN ('CREADO', 'RECIBIDO', 'LISTO')),
    CONSTRAINT "check_prioridad" CHECK("prioridad" IN (1, 0))
);

CREATE TABLE "parte_de_pedido" (
    "id_pedido"              INTEGER,
    "sector"                 TEXT,
    "usuario_procesador"     TEXT,
    "estado"                 TEXT DEFAULT 'CREADO',
    "fecha_creacion"         TEXT,
    "fecha_finalizacion"     TEXT,
    "nombre_persona_proceso" TEXT,
    "observacion"            TEXT,
    PRIMARY KEY("id_pedido", "sector"),
    FOREIGN KEY("id_pedido") REFERENCES "pedido"("id_pedido")
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY("sector") REFERENCES "sector"("sector")
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY("usuario_procesador") REFERENCES "usuario"("username")
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CHECK("estado" IN ('CREADO', 'RECIBIDO', 'LISTO'))
);

CREATE TABLE "articulo_de_parte" (
    "id_articulo" TEXT,
    "id_pedido"   INTEGER,
    "sector"      TEXT,
    PRIMARY KEY("id_articulo", "id_pedido", "sector"),
    FOREIGN KEY("id_pedido", "sector") REFERENCES "parte_de_pedido"("id_pedido", "sector")
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY("id_articulo") REFERENCES "articulo"("id_articulo")
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

COMMIT;

PRAGMA foreign_keys = ON;`); // ejecuta el script de creación de tablas y datos iniciales
*/
module.exports = db