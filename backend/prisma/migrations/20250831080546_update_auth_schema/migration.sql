-- CreateTable
CREATE TABLE "public"."auth" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'customer',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionPlan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contacts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phoneNo" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAtb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewedHouses" JSONB,
    "postedHouses" JSONB,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."houses" (
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
CREATE TABLE "public"."housePictures" (
    "id" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "isDeleted" TEXT NOT NULL,

    CONSTRAINT "housePictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."messages" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "houseId" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_userName_key" ON "public"."auth"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "public"."auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_userId_key" ON "public"."user"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_key" ON "public"."subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_userId_key" ON "public"."contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_phoneNo_key" ON "public"."contacts"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "public"."contacts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "history_userId_key" ON "public"."history"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "houses_name_key" ON "public"."houses"("name");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contacts" ADD CONSTRAINT "contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "public"."houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."history" ADD CONSTRAINT "history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."houses" ADD CONSTRAINT "houses_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."housePictures" ADD CONSTRAINT "housePictures_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "public"."houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "public"."houses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
