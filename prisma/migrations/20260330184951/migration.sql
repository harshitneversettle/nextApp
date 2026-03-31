/*
  Warnings:

  - Added the required column `eventDesc` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "eventDesc" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL;
