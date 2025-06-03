const path = require('path');
const fs = require('fs');

const uploadService = {
	save: async (file) => {
		if (!file) {
			throw new Error('No file uploaded');
		}

		const timestamp = Date.now();
		const extension = path.extname(file.originalname);
		const filename = `${timestamp}${extension}`;

		const filePath = path.join(__dirname, '../../uploads/images', filename);

		fs.writeFileSync(filePath, file.buffer);
		return filename;
	}
}

module.exports = uploadService;
