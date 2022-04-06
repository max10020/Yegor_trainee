const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser")
const {query} = require("express");
const app = express();
app.use(bodyParser.json());


const isEmpty = query => (Object.keys(query).length === 0 || Object.values(query)[0].length === 0 ? true :  false);


app.get('/:id/', (req, res)=>{
    try{
        const key = req.query;
        if(!isEmpty(key)) return res.status(200).send(key);
        else return res.status(400).send("Bad request");

    } catch(err){
        res.render('error', {error: err});
    }

});

app.post('/', (req, res)=>{
    try{
        res.send(req.body);
    } catch(err){
        res.render('error', {error: err});
    }

});


app.put('/:id/', (req, res)=>{
    try{
        res.status(200).send(req.params.id);
    } catch(err){
        res.render('error', {error: err});
    }
});

app.delete('/:id/', (req, res)=>{
    try{
        if(!isEmpty(req.query)){
            const id = req.params.id;
            const query = req.query;
            const query_params = {id, query};
            res.status(200).send(query_params);
        } else return res.status(400).send('Bad request');
    } catch(err){
        res.render('error', {error: err});
    }

});

let port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log('Listening on ' + port);
});


