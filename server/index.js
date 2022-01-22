const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Welcome to the API",
    },
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
