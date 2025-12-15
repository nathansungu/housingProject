import auth from "./aut.route";
import { houses } from "./houses.routes";
import { Router } from "express";
import { users } from "./users.route";
import {message} from "../routes/messags.route"
import verifyLogin from "../middlewares/verifylogin.middleware";
const router = Router();

router.use("/auth",auth);
router.use("/houses", verifyLogin,houses)
router.use("/users",verifyLogin,users)
router.use("/messages", verifyLogin,message)

export default router;