import { Router } from "express";
import { verifyJWT } from "../middleware/auth-middleware";
import { changePassword } from "../controllers/users-controller";

const router = Router();

router.route("/password").patch(verifyJWT, changePassword);

export default router;
