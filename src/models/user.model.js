const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	password: {
		type: String
	},
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	location: {
		type: String
	},
	description: {
		type: String
	},
	occupation: {
		type: String
	},
}, {
	timestamps: true,
	collection: "users"
});

userSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

userSchema.methods.comparePassword = function (password) {
	return this.password === password;
};

module.exports = mongoose.model("users", userSchema);
