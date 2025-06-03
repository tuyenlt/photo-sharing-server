const router = require("express").Router();

const userRouter = require("./user.route");
const photoRouter = require("./photo.route");
const commentRouter = require("./comment.route");

router.use("/users", userRouter);
router.use("/photos", photoRouter);
router.use("/comments", commentRouter);

module.exports = router;