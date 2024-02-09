const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json()); // app link kr diya jo body me se json parse krne me help krta hai

const blog = require("./routes/blog")

// mount
app.use("/api/v1", blog);

const connectWithDb = require("./config/database");
connectWithDb();

// start thr server
app.listen(PORT, () => {
    console.log(`App is started at Port no. ${PORT}`);
})

app.get("/", (req, res) => {
    res.send(`<h1>This is my HomePage</h1>`)
})