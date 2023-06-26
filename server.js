const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./database");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extend: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

db.connect((error) => {
  if (error) console.log(error);
  else console.log("Connected to MYSQL Database.....");
});

app.use(routes);
app.listen(port, () => console.log(`Listening on : ${port}`));
