import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { generateRandomData } from './controllers/controller.js';
import { router } from './routes/index.js';
import headerAPI from "./midleware/index.js";


import { createRequire } from "module";
const require = createRequire(import.meta.url);
import "./passport/Passport.js"
import passport from "passport"
const basicStrategy = require("passport-ibm-connections-basic").Strategy;
// const bcrypt = require('bcryptjs')


const app = express();

// app.use(passport.initialize()) //Вызывает пасспорт на каждый запрос

app.use(passport.initialize())

// app.post('/hello', (req,res)=>{
//         console.log(req.session)
//         res.send(req.session)
// })



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







