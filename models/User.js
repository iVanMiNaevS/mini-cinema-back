const {Schema, model} = require("mongoose");
const User = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		default:
			"https://img.freepik.com/free-photo/flat-lay-red-shades-pattern-with-copy-space_23-2148263995.jpg?t=st=1722724664~exp=1722728264~hmac=e2adfd353ca353392eb199623247111fdfda1ba3e09f735c173e6679835cabd1&w=1380",
	},
	listFilm: [
		{
			Poster: String,
			Title: String,
			Type: String,
			Year: String,
			imdbID: String,
			watched: {
				type: Boolean,
				default: false
			}
		},
	],
});

module.exports = model("User", User);
