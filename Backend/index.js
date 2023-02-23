const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.route");
const cors = require("cors");
const app = express();
const session = require("express-session");

// middlewares:-
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

app.use("/users", userRouter);

//connect to the server:-
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(`Cannot connect to DB: ${err}`);
  }
  console.log(`Server is running on http://localhost:${process.env.port}`);
});
