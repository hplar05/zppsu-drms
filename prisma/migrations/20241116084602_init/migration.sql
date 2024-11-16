/*
  Warnings:

  - The values [APPROVE,DISAPPROVE] on the enum `Action` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `subjectname` on the `RequestForm` table. All the data in the column will be lost.
  - You are about to drop the column `couse` on the `User` table. All the data in the column will be lost.
  - Added the required column `course` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `studId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Course" AS ENUM ('BSIT', 'BSAT', 'BSET', 'BSEIexT', 'BSMT', 'BSCRACT', 'BSCompTech', 'BSEntrep', 'BSHM', 'BSInfoTech', 'BSMarE', 'BSDevcom', 'BFA');

-- CreateEnum
CREATE TYPE "RegistrarForms" AS ENUM ('Enrollment_Form', 'Diploma', 'TOR', 'Report_of_Grades', 'Certificate_of_Transfer', 'Application_of_Cross_Enrollment', 'Certificate_of_Enrollment', 'Request_Form_for_Students_Permanent_Record', 'Evaluation_Form', 'Request_Form_for_Document_Issurance', 'Students_List', 'College_Students_Permanent_Record', 'Application_Form_for_Graduation', 'Completion_Removal_Form', 'Prospectus', 'Enrollment_List');

-- AlterEnum
BEGIN;
CREATE TYPE "Action_new" AS ENUM ('PENDING', 'DECLINE', 'APPROVE_PENDING_PAYMENT', 'PAID', 'COMPLETED');
ALTER TABLE "RequestForm" ALTER COLUMN "action" DROP DEFAULT;
ALTER TABLE "RequestForm" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TABLE "ArchiveRequest" ALTER COLUMN "action" TYPE "Action_new" USING ("action"::text::"Action_new");
ALTER TYPE "Action" RENAME TO "Action_old";
ALTER TYPE "Action_new" RENAME TO "Action";
DROP TYPE "Action_old";
ALTER TABLE "RequestForm" ALTER COLUMN "action" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'GRADUATE_STUDENT';
ALTER TYPE "Role" ADD VALUE 'IRREGULAR';
ALTER TYPE "Role" ADD VALUE 'DROPOUT';
ALTER TYPE "Role" ADD VALUE 'RETURNEES';
ALTER TYPE "Role" ADD VALUE 'SUPERADMIN';

-- AlterTable
ALTER TABLE "RequestForm" DROP COLUMN "subjectname",
ADD COLUMN     "payslipUrl" TEXT,
ADD COLUMN     "requestChoices" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "couse",
ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "isApprove" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proofOfID" TEXT,
ADD COLUMN     "semmester" TEXT,
ADD COLUMN     "yearAttended" TEXT,
ALTER COLUMN "studId" SET NOT NULL;

-- CreateTable
CREATE TABLE "ArchiveRequest" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "nameOfStudent" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "yearAndsection" TEXT NOT NULL,
    "purposeOfrequest" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attachment" TEXT,
    "action" "Action" NOT NULL DEFAULT 'COMPLETED',
    "requestChoices" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateUt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArchiveRequest_pkey" PRIMARY KEY ("id")
);
