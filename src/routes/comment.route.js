const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/commentsOfUser/:id", commentController.getCommentOfUser);

module.exports = router;

