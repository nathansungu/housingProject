import { Router } from "express";
import { sendMessage, getHouseMessages, getUserMessages, deleteMessage, markMessageRead } from "../controllers/message.controller"
export const message = Router()

message.post("/", sendMessage)
message.delete("/", deleteMessage)
message.get("/user", getUserMessages)
message.get("/house", getHouseMessages)
message.patch("/status", markMessageRead)

