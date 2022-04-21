import {Pets, Owners, Kennel} from "../models/index.js";
import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require('../randomData/data.json');

const randomData  = (array) => {
    return Math.floor(Math.random()) * array.length
}

const generateRandomData = async (req, res)=>{
    try{
        //Pets
        const {pets} = data;
        for await(name of pets.name){
            await new Pets({name: name, kind: pets.kind[randomData(pets.kind)]}).save();
        }

        //Owners
        const {owners} = data;
        for await(name of owners.name){
            await new Owners({name: name, phone: owners.phone}).save();
        }

        // Kennel
        const {kennels} = data;
        for await (company of kennels.company){
            await new Kennel({company: company, rating: kennels.rating[randomData(kennels.rating)]})
        }

        res.send('Random data generated')
    } catch(err) {res.render({'error': err})}
};


export { generateRandomData };