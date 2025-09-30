import { Router } from "express";
import {updateContacts,updateProfile} from "../controllers/users.controller"
export const users = Router()

users.patch("/profile",updateProfile)
users.patch("/contacts",updateContacts)

