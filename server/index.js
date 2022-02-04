require("dotenv").config();
require("./src/modules/redis");
const port = 5000;
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./src/routers");

app.use(express.json());
app.use(cors());
app.use("/api/v1/", router);

app.listen(port, () => console.log(`listen on port ${port}`));
