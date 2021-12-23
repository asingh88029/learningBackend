const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  throw new Error("Something went wrong")
  res.send("Welcome to the main route!");
});

app.get("/about", (req, res) => {
  res.status(200).send({
    message: "About Route",
  });
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || `Internal Server Error`,
    },
  });
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server started at port ${port}`);
  } else {
    console.log(err);
  }
});
