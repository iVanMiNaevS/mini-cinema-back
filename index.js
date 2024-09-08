require("dotenv").config();
const cors = require("cors");
const userController = require("./controllers/UserController.js");
const mongoose = require("mongoose");
const express = require("express");
const checkToken = require("./middleware/checkToken.js");
const checkRefreshToken = require("./middleware/checkRefreshToken.js");
const app = express();
const port = process.env.PORT;

mongoose
	.connect(process.env.DB_CONN)
	.then(() => {
		console.log("Connect to DB");
	})
	.catch((err) => {
		console.log(err);
	});

app.use(cors());
app.use(express.json());

app.get("/data-user", checkToken, userController.getDataUser);
app.post("/sign-up", userController.registration);
app.post("/login", userController.login);
app.post("/add-film", checkToken, userController.addFilm);
app.delete("/delete-film", checkToken, userController.deleteFilm);
app.patch("/change-watched", checkToken, userController.changeWatchedFilm);
// app.post("/refresh", checkRefreshToken, (req, res) => {
// 	const tokenAccess = jwt.sign(
// 		{id: req.token.id, avatar: req.token.avatar},
// 		process.env.SECRETACCESS,
// 		{
// 			expiresIn: "24h",
// 		}
// 	);
// 	const tokenRefresh = jwt.sign(
// 		{id: req.token.id, avatar: req.token.avatar},
// 		process.env.SECRETREFRESH,
// 		{
// 			expiresIn: "3d",
// 		}
// 	);
// 	res.status(200).json({tokenAccess, tokenRefresh});
// });

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
