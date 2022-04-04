const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Listening on ` + port);
})

app.get(`/hello`, (req, res)=>{
    res.send(`Hello!`)
})