-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('A_FAIRE', 'EN_COURS', 'FAIT');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descrption" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'FAIT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
