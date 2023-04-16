/*
  Warnings:

  - The primary key for the `GuildUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `guilds` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "GuildUser" DROP CONSTRAINT "GuildUser_guildId_fkey";

-- AlterTable
ALTER TABLE "GuildUser" DROP CONSTRAINT "GuildUser_pkey",
ALTER COLUMN "guildId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GuildUser_pkey" PRIMARY KEY ("userId", "guildId");

-- AlterTable
ALTER TABLE "guilds" DROP CONSTRAINT "guilds_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "guilds_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "GuildUser" ADD CONSTRAINT "GuildUser_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
