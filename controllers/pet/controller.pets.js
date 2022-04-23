import mongoose from "mongoose";
import Pets from "../../models/pet/model.pet.js";

const toId = mongoose.Types.ObjectId;

const getPet = async (req, res)=>{
    try{
        const id = req.params.id;
        const pet = await Pets.findById(toId(id));
        res.json(pet);
    } catch(err){res.json({error: err})}
};

const addPet = async (req, res)=>{
    try{
        const data = req.body;
        await new Pets(data).save();
        res.send('Success');
    } catch(err){res.json({error: err})}
};

export {getPet, addPet};