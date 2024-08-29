require("dotenv").config();
jwt = require("jsonwebtoken");

module.exports = function checkRefreshToken(req, res, next) {
	try {
		const refreshToken = req.headers.authorization.split(" ")[1];
		if (!refreshToken) {
			res.status(400).json({message: "нет токена"});
		}
		const decoded = jwt.verify(refreshToken, process.env.SECRETREFRESH);
		req.token = decoded;
		next();
	} catch (error) {
		console.log(error);
		res.status(400).json("Пользователь не авторизован");
	}
};
