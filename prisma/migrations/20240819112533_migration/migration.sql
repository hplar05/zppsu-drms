-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('APPROVE', 'DISAPPROVE', 'PENDING');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "RequestForm" (
    "id" SERIAL NOT NULL,
    "nameOfStudent" TEXT,
    "course" TEXT NOT NULL,
    "subjectname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 18,
    "action" "Action" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestForm" ADD CONSTRAINT "RequestForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
