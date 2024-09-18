import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verify.js";

const router = express.Router();

// CHECK AUTHENTICATION
// router.get("/checkAuth", verifyToken, (req, res, next) => {
//   res.send("you are log in!");
// });

// CHECK USER
// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are login, you can delete you account!");
// });

// CHECK ADMIN
// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello you are Admin, you can delete all users! ");
// });

//GET ALL
router.get("/", verifyAdmin, getUsers);

//GET
router.get("/:id", verifyUser, getUser);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

export default router;
