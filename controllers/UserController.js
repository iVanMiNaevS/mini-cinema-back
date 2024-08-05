const bcrypt = require("bcrypt");
const User = require("../models/User.js");
class userController {
	async registration(req, res) {
		const {password, username} = req.body;

		const condidate = await User.findOne({username});
		if (condidate) {
			return res.status(400).json("such a user already exists");
		}
		const hashPassword = bcrypt.hashSync(password, 7);
		const user = new User({
			username: username,
			password: hashPassword,
			avatar:
				"https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13",
		});
		await user.save();
		res.status(200).json("user create");
	}
	async login(req, res) {
		const {password, username} = req.body;
	}
}

module.exports = new userController();
