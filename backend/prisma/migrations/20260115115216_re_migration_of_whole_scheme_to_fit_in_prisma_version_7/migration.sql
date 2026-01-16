-- CreateTable
CREATE TABLE "auth" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'customer',
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imgUrl" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionPlan" TEXT NOT NULL DEFAULT 'free',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phoneNo" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewedHouses" JSONB,
    "postedHouses" JSONB,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "houses" (
    "id" TEXT NOT NULL,
    "landlordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "roomsNumber" INTEGER NOT NULL,
    "vacantUnits" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pricing" INTEGER NOT NULL,
    "waterBill" BOOLEAN NOT NULL,
    "electricBill" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "rentDeadline" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "housePictures" (
    "id" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "imgUrl" TEXT[],
    "isDeleted" TEXT NOT NULL DEFAULT 'false',

    CONSTRAINT "housePictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "houseId" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_userName_key" ON "auth"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_userId_key" ON "user"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_key" ON "subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_userId_key" ON "contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phoneNo_key" ON "contacts"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "history_userId_key" ON "history"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "houses_name_key" ON "houses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "housePictures_houseId_key" ON "housePictures"("houseId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houses" ADD CONSTRAINT "houses_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housePictures" ADD CONSTRAINT "housePictures_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "houses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
