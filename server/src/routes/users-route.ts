import { Router } from "express";
import { verifyJWT } from "../middleware/auth-middleware";
import {
  changePassword,
  updateSocialLinks,
  updateUserInfo,
} from "../controllers/users-controller";

const router = Router();

router.route("/password").patch(verifyJWT, changePassword);
router.route("/social-links").patch(verifyJWT, updateSocialLinks);
router.route("/user-info").patch(verifyJWT, updateUserInfo);

export default router;
