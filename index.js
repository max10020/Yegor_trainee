import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { generateRandomData } from './controllers/controller.js';
import { router } from './routes/index.js';
import headerAPI from "./midleware/index.js";


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(headerAPI)

const db = "mongodb://localhost:27017/myDatabase";
mongoose.connect(db, {useNewUrlParser: true}, ()=>{
        console.log('DB connected')
});

app.use('/', router);
app.get('/random', generateRandomData);

let port = process.env.PORT || 8088;
app.listen(port, ()=>{
        console.log('Listening on ' + port);
});







