const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const UserController = require("../Controllers/UserControllers");

router.get("/", UserController.getAllUsers);
router.get("/report", UserController.generateUsersReport);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
module.exports = router;
