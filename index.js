require("dotenv").config();
const cors = require("cors");
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

app.use(cors());
app.use(express.json());
app.post("/sign-up", userController.registration);

app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});
