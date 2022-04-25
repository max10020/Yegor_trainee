import mongoose from "mongoose";
import { handleErrors } from "../controller.js";
import Owners from "../../models/owner/Owner.js";
import Pets from "../../models/pet/Pet.js";

const toId = mongoose.Types.ObjectId;

const getOwner = async (req,res)=>{
    try{
        const id = req.params.id;
        const owner = await Owners.findOne(toId(id));
        res.json(owner);
    } catch(err){ handleErrors(err, res) }

};

const addOwner = async (req, res)=>{
    try{
        const data = req.body;
        const dataKey = Object.keys(data);

        if(!dataKey.includes("name")){
            res.status(400).send('"name" is missing')
        } else if(!dataKey.includes("phone")){
            res.status(400).send('"phone" is missing')
        }

        if(dataKey.includes("name") && typeof data.name !== "string"){
           return res.status(400).send(`Wrong value in "name". Must be a string. Your input type: ${typeof data.name}`)
        }
        if(dataKey.includes("phone") && typeof data.phone !== "string"){
            return res.status(400).send(`Wrong value in "phone". Must be a string. Your input type: ${typeof data.phone}`)
        }

        if(dataKey.includes("phone") && !/\d{3}-\d{3}-\d{4}/.test(data.phone)){
            return res.status(400).send(`Wrong input in "phone". Must be like "333-333-444". Your input: ${data.phone}`)
        }
        await new Owners(data).save();
        res.send('success');
    } catch(err){ handleErrors(err, res) }
};

const adoptPet = async(req, res)=>{
    try{
        const { owner } = req.params;
        const { pet } = req.params;

        await Owners.findOneAndUpdate(toId(owner), {$push: {pet: toId(pet)}});
        await Pets.findOneAndUpdate(toId(pet), {$push: {owner: toId(owner)}});

        res.send('Adopted');
    } catch(err){res.json({error: err})}
};

const viewPets = async (req, res)=>{
    try{
        const { id } = req.params;
        const a = await Owners.findById(toId(id))
            .populate({ path: 'pet' });
        res.send(a);
    } catch(err){res.json({error: err})}
};

export {viewPets, adoptPet, addOwner, getOwner}
