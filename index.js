const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser")


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json());


app.get(`/`, (req,res)=>{
    const key = req.query
    res.send(key)
})

app.post(`/`, (req,res)=>{
    res.send(req.body)
})

app.put(`/:id`, (req,res)=>{
    res.send(req.params.id)
})

app.delete(`/:id/`, (req,res)=>{
    const id = req.params.id;
    const query = req.query
    const query_params = {id, query}
    res.send(query_params)
})

let port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Listening on ` + port);
});


