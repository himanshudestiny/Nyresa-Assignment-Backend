const express = require("express");
const { connection } = require("./configs/db");



require('dotenv').config()
const cors = require("cors");
const { mensRouter } = require("./routes/Mens.route");
const { womensRouter } = require("./routes/Womens.route");
const { kidsRouter } = require("./routes/Kids.route");


const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use("/mens", mensRouter);
app.use("/womens", womensRouter);
app.use("/kids", kidsRouter);

app.get("/", (req, res) => {
    res.send("Welcome");
})


app.listen(process.env.port, async () => {
    try {
       await connection;
       console.log(`Server is running on port ${process.env.port}`);
    }
    catch (err) {
          console.log(err);
          console.log("Some error occured while connecting to the server");
    }
    
})