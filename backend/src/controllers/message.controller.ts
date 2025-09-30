import { Request, Response } from "express";
import { asyncHandler } from "../utilities/asyncHandler";
import {
  deleteMessageService,
  getHouseMessagesService,
  markMessageService,
  sendMessageService,
  userMessagesServices,
} from "../services/messages.service";
import {
  houseIdValidation,
  messageIdValidation,
  messageStatusValidation,
  sendMessageValidation,
} from "../zodValidation/messages";

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const data = await sendMessageValidation.parseAsync(req.body);
  const message = await sendMessageService(data);
  if (message) {
    res.status(200).json(message);
    return;
  }
});

export const getUserMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const messages = await userMessagesServices(userId);
    if (messages) {
      res.status(200).json(messages);
      return;
    }
  }
);

export const deleteMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const { messageId } = await messageIdValidation.parseAsync(req.params);
    const message = await deleteMessageService(messageId);
    if (message) {
      res.status(200).json({ message: "message deleted successfully" });
      return;
    }
  }
);

export const getHouseMessages = asyncHandler(
  async (req: Request, res: Response) => {
    const { houseId } = await houseIdValidation.parseAsync(req.params);
    const messages = await getHouseMessagesService(houseId, req.userId);
    if (messages) {
      res.status(200).json(messages);
      return;
    }
  }
);

export const markMessageRead = asyncHandler(
  async (req: Request, res: Response) => {
    const { messageId } = await messageIdValidation.parseAsync(req.params);
    const { status } = await messageStatusValidation.parseAsync(req.body);
    const message = await markMessageService(messageId, status);
    if (message) {
      res.status(200).json("status changes sccessflly");
    }
  }
);
