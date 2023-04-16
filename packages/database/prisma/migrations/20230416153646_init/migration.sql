-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild_user" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "guild_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reactions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guildUserId" TEXT NOT NULL,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guild_user" ADD CONSTRAINT "guild_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_user" ADD CONSTRAINT "guild_user_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_guildUserId_fkey" FOREIGN KEY ("guildUserId") REFERENCES "guild_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
