const express = require('express');
const app = express();
const port = 3000;

const taskRoutes = require("./src/routes/taskRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", taskRoutes)

app.get("/", (req, res) => {
  res.send("API is running")
})

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;