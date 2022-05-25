import { Router } from "express";
import Pets from "../../models/pet/Pet.js";
import { handleErrors } from "../../controllers/controller.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const allPetsRouter = Router();

const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: "name", title: "NAME"},
        {id: "kind", title: "KIND"},
    ]
})

allPetsRouter.get('/', async (req, res)=>{
    let allPets = await Pets.find({});
    await csvWriter.writeRecords(allPets)
    res.attachment('file.csv')
    res.send(allPets)
})

export { allPetsRouter }