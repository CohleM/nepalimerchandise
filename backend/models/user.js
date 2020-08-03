const mongoose = require("mongoose");
const { array } = require("prop-types");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		min: 6,
		max: 255,
	},

	email: {
		type: String,
		require: true,
		min: 6,
		max: 255,
	},

	password: {
		type: String,
		require: true,
		min: 6,
		max: 1024,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	cart: {
		type: Array,
		default: [],
	},
	history: {
		type: Array,
		default: [],
	},
});

module.exports = mongoose.model("user", userSchema);
