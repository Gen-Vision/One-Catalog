const express = require("express");
const { createServer } = require("http");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const app = express();
const server = createServer(app);

const cors = require("cors");
const userRouter = require("./routes/user.router");
const productRouter = require("./routes/product.router");

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use('/user',productRouter);

app.get("/", (req, res) => {
  res.json({ ans: "SERVER IS RUNNING" });
});
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongoose connected`);
});

db.on("error", (err, next) => {
  next(err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({
    message: message,
  });
  console.log(error);
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});