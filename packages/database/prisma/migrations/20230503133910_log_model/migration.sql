-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('AUDIT', 'COMMAND');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('POOP', 'UNPOOP');

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "LogType" NOT NULL DEFAULT 'COMMAND',
    "action" "Action" NOT NULL DEFAULT 'POOP',
    "targetUserId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "guild_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
