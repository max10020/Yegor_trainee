import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {getElement, addElement, deleteElement} from './models/controllers/controller.js'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = "mongodb://localhost:27017/myDatabase";
mongoose.connect(db, {useNewUrlParser: true})

app.get('/:id', getElement);
app.post('/add', addElement);
app.delete("/:id", deleteElement)


let port = process.env.PORT || 8088;
app.listen(port, ()=>{
        console.log('Listening on ' + port);
});







