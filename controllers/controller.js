import {Pets, Owners, Kennel} from "../models/index.js";
import mongoose from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require('../randomData/data.json');
const toId = mongoose.Types.ObjectId;

const randomData  = (array) => {
    return Math.floor(Math.random()) * array.length
}



const getElement =  async (req, res)=>{
    try{
        const id = req.params.id;
        const data = await Pets.findById(id);
        res.json({data});
        console.log(data)
    } catch(err) {res.render('error', {error: err})}
};


const addElement = async (req, res) => {
    try{
        const data = req.body;
        await new Pets(data).save();
        res.send('Element added');
    } catch(err) {res.render('error', {error: err})}
};

const deleteElement = async (req, res)=> {
    try{
        const id = req.params.id;
        await Pets.findByIdAndDelete(id);
        res.send('Element deleted')
    } catch(err) {res.render('error', {error: err})}
};

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

const adoptPet = async (req, res) =>{

    const owner = toId(req.params.owner);
    const pet = toId(req.params.pet);

    if(req.params.kennelOwner === 'owner'){
        const getPet = await Pets.findById(pet);
        await getPet.owner = owner;
        getPet.save();
    }
    if(req.params.kennelOwner === 'kennel'){
        const getPet = await Pets.findById(pet);
        await getPet.kennel = owner;
        getPet.save();
    }


    res.send('Adopted pet')
}

export { getElement, addElement, deleteElement, generateRandomData, adoptPet };