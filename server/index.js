require("dotenv").config();

const { connectDB } = require("./app/configs/db");

connectDB();

const express = require("express");
const cors = require("cors");
const authRoute = require("./app/routes/authRoute");
const app = express();

//Cors
app.use(cors());

//Body Parser
app.use(express.json());

const port = process.env.APP_PORT;

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       message: "Welcome to the API",
//     },
//   });
// });

//Mount the route
app.use("/api/v1/auth", authRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
