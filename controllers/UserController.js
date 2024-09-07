require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
var jwt = require("jsonwebtoken");

class userController {
	async registration(req, res) {
		const { password, username } = req.body;

		const condidate = await User.findOne({ username });
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
		try {
			const { password, username } = req.body;
			const condidate = await User.findOne({ username });
			if (!condidate) {
				return res.status(400).json("incorrect username or password");
			}
			const validPassword = bcrypt.compareSync(password, condidate.password);

			if (!validPassword) {
				return res.status(400).json("incorrect username or password");
			}

			const tokenAccess = jwt.sign(
				{ id: condidate._id, avatar: condidate.avatar },
				process.env.SECRETACCESS,
				{
					expiresIn: "1h",
				}
			);
			// const tokenRefresh = jwt.sign(
			// 	{id: condidate._id, avatar: condidate.avatar},
			// 	process.env.SECRETACCESS,
			// 	{
			// 		expiresIn: "3d",
			// 	}
			// );
			res.status(200).json({ tokenAccess });
		} catch (e) {
			res.json(e.message);
		}
	}
	async getDataUser(req, res) {
		const { id } = req.token;
		try {
			const condidate = await User.findOne({ _id: id });
			if (!condidate) {
				return res.status(500).json("the user with this id was not found");
			}
			res
				.status(200)
				.json({ avatar: condidate.avatar, listFilm: condidate.listFilm });
		} catch (error) {
			res.json(error.message);
		}
	}

	async addFilm(req, res) {
		const { id } = req.token;
		const condidate = await User.findOne({ _id: id });
		const p = condidate.listFilm.filter((film) => {
			if (film.imdbID === req.body.newFilm.imdbID) {
				return film;
			}
		});
		if (p.length !== 0) {
			return res.status(400).json("There is already such a film");
		}
		const prevList = condidate.listFilm;
		const updateDocument = {
			$set: {
				listFilm: [...prevList, req.body.newFilm],
			},
		};
		try {
			await User.updateOne({ _id: id }, updateDocument);
			const { listFilm } = await User.findOne({ _id: id });
			res.status(200).json({ listFilm });
		} catch (e) {
			res.json(e.message);
		}
	}

	async deleteFilm(req, res) {
		const { id } = req.token;
		const film = req.body.film;
		if (!film) {
			return res.status(400).json("не передан фильм");
		}
		try {
			await User.updateOne(
				{ _id: id },
				{
					$pull: {
						listFilm: {
							imdbID: film.imdbID,
						},
					},
				}
			);
			const user = await User.findOne({ _id: id });

			res.status(200).json({ listFilm: user.listFilm });
		} catch (err) {
			res.status(500).json(err.message);
		}
	}
}

module.exports = new userController();
