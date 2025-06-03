const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const router = require("./routes");
const path = require("path");
// const LoadDb = require("./db/dbLoad");

dbConnect();

app.use((req, res, next) => {
	console.log(`${req.method} request for '${req.url}'`);
	next();
})

app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", router)

app.get("/", (request, response) => {
	response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(3000, () => {
	console.log("server listening on port 3000");
});
