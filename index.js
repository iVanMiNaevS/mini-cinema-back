require("dotenv").config();
const userController = require("./controllers/UserController.js");
const mongoose = require("mongoose");
const express = require("express");
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

app.get("/registration", userController.registration);

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
