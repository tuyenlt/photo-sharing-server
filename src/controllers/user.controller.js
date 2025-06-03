const User = require('../models/user.model')
const JwtService = require('../services/jwt');

const userController = {
	login: async (req, res) => {
		try {
			const { username, password } = req.body;
			if (!username || !password) {
				return res.status(400).json({ message: "username and password are required" });
			}

			const user = await User.findOne({ username });
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			const isMatch = await user.comparePassword(password);
			if (!isMatch) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const accessToken = JwtService.generateAccessToken(user);

			res.status(200).json(accessToken);

		} catch (error) {
			console.error("Error during login:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	regisger: async (req, res) => {
		try {
			const { username, password, first_name, last_name, location,
				description, occupation } = req.body;


			const existingUser = await User.findOne({ username });
			if (existingUser) {
				return res.status(400).json({ message: "Username already exists" });
			}

			const newUser = await User.create({
				username,
				password,
				first_name,
				last_name,
				location,
				description,
				occupation
			});

			const accessToken = JwtService.generateAccessToken(newUser);

			res.status(200).json(accessToken);

		} catch (error) {
			console.error("Error during registration:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	getUserById: async (req, res) => {
		try {
			const userId = req.params.id;
			if (!userId) {
				return res.status(400).json({ message: "User ID is required" });
			}
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			res.status(200).json(user);
		} catch (error) {
			console.error("Error fetching user by ID:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	getUserList: async (req, res) => {
		try {
			const users = await User.find();
			if (!users || users.length === 0) {
				return res.status(404).json({ message: "No users found" });
			}
			res.status(200).json(users);
		} catch (error) {
			console.error("Error fetching user list:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	},
	getMe: async (req, res) => {
		try {
			const user = await User.findById(req.user._id);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			res.status(200).json(user);
		} catch (error) {
			console.error("Error fetching current user:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}


module.exports = userController;
