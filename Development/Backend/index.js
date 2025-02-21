const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(express.json());

// Use the routes
app.use("/api", routes);


const http = require("http").createServer(app);
const io = require("socket.io")(http);

// {"userId"}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});