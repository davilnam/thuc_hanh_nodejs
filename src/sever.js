import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/web";
import connectDB from "./config/connectDB"
import cors from 'cors';

require("dotenv").config();
const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}));


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

initWebRoute(app);

connectDB();

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})