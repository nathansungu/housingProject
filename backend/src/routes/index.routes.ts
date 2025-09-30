import auth from "./aut.route";
import { houses } from "./houses.routes";
import { Router } from "express";
import { users } from "./users.route";
import {message} from "../routes/messags.route"
const router = Router();

router.use("/auth", auth);
router.use("/houses", houses)
router.use("/users",users)
router.use("/messages", message)

export default router;