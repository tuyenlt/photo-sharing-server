const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const authMiddleware = require("../middlewares/authMiddleware");
const photoController = require("../controllers/photo.controller");



router.use(authMiddleware);

router.post("/upload", upload.single("photo"), photoController.uploadPhoto);
router.post("/addComment/:id", photoController.addCommentToPhoto);
router.get("/photosOfUser/:userId", photoController.getPhotosOfUser);

module.exports = router;
