/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoCancha" AS ENUM ('Futbol', 'Padel');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('Confirmado', 'Cancelado', 'Finalizado');

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Administrador" (
    "id_administrador" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id_administrador")
);

-- CreateTable
CREATE TABLE "Predio" (
    "id_predio" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_administrador" INTEGER NOT NULL,

    CONSTRAINT "Predio_pkey" PRIMARY KEY ("id_predio")
);

-- CreateTable
CREATE TABLE "Cancha" (
    "id_cancha" SERIAL NOT NULL,
    "id_predio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "TipoCancha" NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "duracion" INTEGER NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cancha_pkey" PRIMARY KEY ("id_cancha")
);

-- CreateTable
CREATE TABLE "DiasTrabajo" (
    "id_dia" SERIAL NOT NULL,
    "id_predio" INTEGER NOT NULL,
    "dia" INTEGER NOT NULL,
    "horaApertura" TEXT NOT NULL,
    "horaCierre" TEXT NOT NULL,

    CONSTRAINT "DiasTrabajo_pkey" PRIMARY KEY ("id_dia")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id_reserva" SERIAL NOT NULL,
    "id_cancha" INTEGER NOT NULL,
    "nombreCliente" TEXT NOT NULL,
    "telefonoCliente" TEXT NOT NULL,
    "emailCliente" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "estado" "EstadoReserva" NOT NULL DEFAULT 'Confirmado',
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_correo_key" ON "Administrador"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_slug_key" ON "Administrador"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Predio_slug_key" ON "Predio"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "DiasTrabajo_id_predio_dia_key" ON "DiasTrabajo"("id_predio", "dia");

-- AddForeignKey
ALTER TABLE "Predio" ADD CONSTRAINT "Predio_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "Administrador"("id_administrador") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cancha" ADD CONSTRAINT "Cancha_id_predio_fkey" FOREIGN KEY ("id_predio") REFERENCES "Predio"("id_predio") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiasTrabajo" ADD CONSTRAINT "DiasTrabajo_id_predio_fkey" FOREIGN KEY ("id_predio") REFERENCES "Predio"("id_predio") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_cancha_fkey" FOREIGN KEY ("id_cancha") REFERENCES "Cancha"("id_cancha") ON DELETE CASCADE ON UPDATE CASCADE;
