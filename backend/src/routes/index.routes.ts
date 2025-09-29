import auth from "./aut.route";
import { houses } from "./houses.routes";
import { Router } from "express";
const router = Router();

router.use("/auth", auth);
router.use("/houses", houses)

export default router;