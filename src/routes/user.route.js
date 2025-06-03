const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/user.controller");


router.post("/login", userController.login);
router.post("/register", userController.login);
router.post("/", userController.regisger);
router.get("/list", authMiddleware, userController.getUserList);
router.get("/me", authMiddleware, userController.getMe);
router.get("/:id", authMiddleware, userController.getUserById);

module.exports = router;