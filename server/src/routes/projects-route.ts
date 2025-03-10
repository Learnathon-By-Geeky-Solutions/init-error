import { Router } from "express";
import { verifyJWT } from "../middleware/auth-middleware";
import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
} from "../controllers/projects-controller";

const router = Router();

router.route("/").post(verifyJWT, createProject);
router.route("/:projectId").get(getProjectById);
router.route("/:projectId").put(verifyJWT, updateProject);
router.route("/:projectId").delete(verifyJWT, deleteProject);

export default router;
