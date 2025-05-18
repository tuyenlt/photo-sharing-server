const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

router.get("/photosOfUser/:id", async (req, res) => {
    try {
        const photos = await Photo.find({ user_id: req.params.id }).select(" -comments._id");
        if (!photos) {
            return res.status(404).json({ message: "No photos found for this user" });
        }
        res.status(200).json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
