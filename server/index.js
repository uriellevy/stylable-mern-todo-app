const tasks = require("./routes/tasks");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const url = `mongodb+srv://uriel123:uriel123@stylabletodo.x7v84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use("/tasks", tasks);

app.listen(PORT, () =>
  console.log(`server running on port: http://localhost:${PORT}`)
);
