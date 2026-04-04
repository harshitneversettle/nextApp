/*
  Warnings:

  - You are about to drop the column `eventsId` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_eventsId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_adminId_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "eventsId",
DROP COLUMN "userEmail",
DROP COLUMN "userName";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "adminId",
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userId_key" ON "Reviews"("userId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
