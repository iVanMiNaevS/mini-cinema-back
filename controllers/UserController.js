const bcrypt = require("bcrypt");
const User = require("../models/User.js");
class userController {
	async registration(req, res) {
		const {password, username} = req.body;
		console.log(req.body);
		const hashPassword = bcrypt.hashSync(password, 7);

		const user = new User({
			username: username,
			password: hashPassword,
			avatar:
				"https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13",
		});
		await user.save();
		res.json("user create");
	}
}

module.exports = new userController();
