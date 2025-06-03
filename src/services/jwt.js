const jwt = require("jsonwebtoken");


const jwtService = {
	generateAccessToken: (user) => {
		const payload = {
			_id: user._id,
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
		};
		return jwt.sign(payload, process.env.AT_SECRET, { expiresIn: "3days" });
	},
	verifyAccessToken: (token) => {
		try {
			return jwt.verify(token, process.env.AT_SECRET);
		} catch (err) {
			return null;
		}
	},
}

module.exports = jwtService;