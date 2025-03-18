import {
  createUser,
  deleteUserById,
  getAttendants,
  getSignleUser,
  getUsers,
  updateUserById,
  updateUserPasswordById,
  updateUserRoleById,
} from "@/controllers/user";
import express from "express";

const router = express.Router();

router.post("/users", createUser);

router.get("/users", getUsers);
router.get("/users/:id", getSignleUser);
router.get("/attendants", getAttendants);

router.put("/users/:id", updateUserById);
router.put("/users/update-password/:id", updateUserPasswordById);
router.put("/users/update-role/:id", updateUserRoleById);

router.delete("/users/:id", deleteUserById);

export default router;
