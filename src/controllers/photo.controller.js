const Photo = require('../models/photo.model');
const uploadService = require('../services/upload');

const photoController = {
	getPhotosOfUser: async (req, res) => {
		try {
			const userId = req.params.userId;
			const photos = await Photo.find({ user_id: userId })
				.populate([
					{
						path: "comments.user_id",
						select: "first_name last_name",
					}, {
						path: "user_id",
						select: "first_name last_name"
					}
				])
				.sort({ date_time: -1 })
				.lean();

			if (photos.length === 0) {
				return res.status(403).json({ message: "No photos found for this user" });
			}

			res.status(200).json(photos);
		} catch (error) {
			console.error("Error in getPhotosOfUser:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	uploadPhoto: async (req, res) => {
		try {
			const file = req.file;
			const { user_id, description } = req.body;

			if (!file || !user_id) {
				return res.status(400).json({ message: "File and user ID are required" });
			}

			const fileUrl = await uploadService.save(file);

			const newPhoto = await Photo.create({
				file_name: fileUrl,
				user_id,
				date_time: new Date(),
				description: description || ""
			})

			res.status(201).json(newPhoto);
		} catch (error) {
			console.error("Error in uploadPhoto:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	addCommentToPhoto: async (req, res) => {
		try {
			const photoId = req.params.id;
			const { user_id, comment } = req.body;

			if (!photoId || !user_id || !comment) {
				return res.status(400).json({ message: "Photo ID, user ID, and comment are required" });
			}

			const photo = await Photo.findById(photoId)

			if (!photo) {
				return res.status(404).json({ message: "Photo not found" });
			}

			photo.comments.push({
				user_id,
				comment,
				date_time: new Date()
			});
			await photo.save();

			const updatedPhoto = await photo.populate({
				path: "comments.user_id",
				select: "first_name last_name"
			});

			res.status(200).json(updatedPhoto);

		} catch (error) {
			console.error("Error in commentToPhoto:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}

module.exports = photoController;