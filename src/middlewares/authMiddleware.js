const jwtService = require("../services/jwt");


const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Access token is required" });
	}

	const decoded = jwtService.verifyAccessToken(token);

	if (!decoded) {
		return res.status(401).json({ message: "Invalid or expired access token" });
	}

	req.user = decoded;
	next();
}

module.exports = authMiddleware;