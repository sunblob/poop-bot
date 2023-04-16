/*
  Warnings:

  - You are about to drop the `GuildUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GuildUser" DROP CONSTRAINT "GuildUser_guildId_fkey";

-- DropForeignKey
ALTER TABLE "GuildUser" DROP CONSTRAINT "GuildUser_userId_fkey";

-- DropTable
DROP TABLE "GuildUser";

-- CreateTable
CREATE TABLE "guild_user" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emoji_to_react" TEXT,

    CONSTRAINT "guild_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "name" TEXT NOT NULL,
    "guildUserId" TEXT NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "guild_user" ADD CONSTRAINT "guild_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_user" ADD CONSTRAINT "guild_user_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_guildUserId_fkey" FOREIGN KEY ("guildUserId") REFERENCES "guild_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
