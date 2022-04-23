import mongoose from "mongoose";
import Pets from "../../models/pet/Pet.js";
import { handleErrors } from "../controller.js";

const toId = mongoose.Types.ObjectId;

const getPet = async (req, res)=>{
    try{
        const id = req.params.id;
        const pet = await Pets.findById(toId(id));
        res.json(pet);
    } catch(err){handleErrors(err, res)}
};

const addPet = async (req, res)=>{
    try{
        const data = req.body;
        await new Pets(data).save();
        res.send('Success');
    } catch(err){handleErrors(err, res)}
};

export {getPet, addPet};