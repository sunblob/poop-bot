/*
  Warnings:

  - The primary key for the `GuildUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `guilds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `guildId` on the `GuildUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `guilds` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "GuildUser" DROP CONSTRAINT "GuildUser_guildId_fkey";

-- AlterTable
ALTER TABLE "GuildUser" DROP CONSTRAINT "GuildUser_pkey",
DROP COLUMN "guildId",
ADD COLUMN     "guildId" INTEGER NOT NULL,
ADD CONSTRAINT "GuildUser_pkey" PRIMARY KEY ("userId", "guildId");

-- AlterTable
ALTER TABLE "guilds" DROP CONSTRAINT "guilds_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "guilds_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "GuildUser" ADD CONSTRAINT "GuildUser_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
