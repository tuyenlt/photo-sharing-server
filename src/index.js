const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const router = require("./routes");
const path = require("path");

dbConnect();

app.use((req, res, next) => {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

// Allow all origins and handle preflight
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", router);

app.get("/", (req, res) => {
	res.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(3000, () => {
	console.log("server listening on port 3000");
});
