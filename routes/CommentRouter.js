const express = require("express");
const Photo = require("../db/photoModel");

const router = express.Router();

router.get("/commentsOfUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const photos = await Photo.find({ "comments.user_id": userId });

        if (!photos || photos.length === 0) {
            return res.status(404).json({ message: "No comments found for this user" });
        }

        const userComments = [];

        photos.forEach(photo => {
            photo.comments.forEach(comment => {
                if (comment.user_id.equals(userId)) {
                    userComments.push({
                        comment: comment.comment,
                        date_time: comment.date_time,
                        photo_id: photo._id,
                        file_name: photo.file_name,
                    });
                }
            });
        });

        res.status(200).json(userComments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

