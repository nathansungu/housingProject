import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export const sendMessageService = async (
  data: Prisma.messagesUncheckedCreateInput
) => {
  const message = await client.messages.create({
    data: data,
  });
  if (!message) return Promise.reject(new Error("failed to send message"));
  return;
};

//get user messages

export const userMessagesServices = async (userId: string) => {
  const message = await client.messages.findMany({
    where: {
      OR: [{ senderId: userId }],
    },
  });
  if (!message) return Promise.reject(new Error("failed to fetch message"));
  return message
};

export const deleteMessageService = async (messageId: string) => {
  const message = await client.messages.update({
    where: { id: messageId },
    data: { isDeleted: true },
  });
  if (!message) return Promise.reject(new Error("failed to delete message"));
  return message
};

export const getHouseMessagesService = async (houseId: string, userId: string) => {
  const messages = await client.messages.findMany({
    where: {
      AND: [{ senderId: userId, houseId: houseId }],
    },
  });
  if (!messages) return Promise.reject(new Error("failed to fetch message"));
  return messages
};

export const markMessageService = async (messageId:string, status:boolean)=>{
    const message = await client.messages.update({
    where:{id:messageId},
    data:{isRead:status}
    })
    if (!message) return Promise.reject(new Error("failed to mark to as read"))
    return message
}