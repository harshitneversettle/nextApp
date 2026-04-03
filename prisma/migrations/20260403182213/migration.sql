/*
  Warnings:

  - You are about to drop the column `description` on the `Reviews` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `review` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "review" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
