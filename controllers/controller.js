import  Pets  from "../models/pet/Pet.js";
import  Owners  from "../models/owner/Owner.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require('../randomData/data.json');


const handleErrors = (err, req, res) =>{
    res.json({"error": err.message})
}

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
            await new Kennel({company: company, rating: kennels.rating[randomData(kennels.rating)]}).save();
        }
        res.send('Random data generated')
    } catch(err) {res.render({'error': err})}
};


export { generateRandomData, handleErrors };