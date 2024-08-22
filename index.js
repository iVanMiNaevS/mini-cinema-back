require("dotenv").config();
const cors = require("cors");
const userController = require("./controllers/UserController.js");
const mongoose = require("mongoose");
const express = require("express");
const checkToken = require("./middleware/checkToken.js");
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
app.post("/sign-up", userController.registration);
app.post("/login", userController.login);
app.get("/get-avatar", checkToken, userController.getAvatar);
app.post("/add-film", checkToken, userController.addFilm);

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
