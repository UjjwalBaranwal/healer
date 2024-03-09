const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");

//////////////////////////////////////////////
////// catching uncaught exception
process.on("uncaughtException", (err) => {
  console.log("uncaught exception .......... shutiing down 💣💣💣💣💣💣");
  console.log(err);
  process.exit(1);
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("connection is stabliished");
  });

//created a serverr
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on a server ${port} ....`);
});

// handling the unhandled error rejection

process.on("unhandledRejection", (err) => {
  // console.log(err.name, err.message);
  console.log("unhandlled rejection .......... shutiing down 💣💣💣💣💣💣");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("uncaught exception .......... shutiing down 💣💣💣💣💣💣");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);
