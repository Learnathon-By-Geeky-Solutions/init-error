import { Router } from "express";
import { verifyJWT } from "../middleware/auth-middleware";
import {
  changePassword,
  updateSocialLinks,
} from "../controllers/users-controller";

const router = Router();

router.route("/password").patch(verifyJWT, changePassword);
router.route("/social-links").patch(verifyJWT, updateSocialLinks);

export default router;
