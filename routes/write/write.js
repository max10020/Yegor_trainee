import {Router} from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const writeRouter = Router();

let fs = require('fs');

writeRouter.post("/", (req, res)=>{
    let data = req.body.data;
    data = data.toString();
    console.log("DATA:", data);
    fs.writeFile('file.txt', data, (err)=>{
        if(err) throw err;
        console.log('Data added successfully');
    });
    res.send('Data added successfully');
})


export { writeRouter }