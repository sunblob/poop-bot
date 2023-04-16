/*
  Warnings:

  - You are about to drop the column `emoji_to_react` on the `guild_user` table. All the data in the column will be lost.
  - The primary key for the `reactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `reactions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "guild_user" DROP COLUMN "emoji_to_react";

-- AlterTable
ALTER TABLE "reactions" DROP CONSTRAINT "reactions_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "reactions_pkey" PRIMARY KEY ("id");
