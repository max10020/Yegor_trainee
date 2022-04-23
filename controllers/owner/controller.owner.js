import mongoose from "mongoose";

import Owners from "../../models/owner/model.owner.js";
import Pets from "../../models/pet/model.pet.js";

const toId = mongoose.Types.ObjectId;

const getOwner = async (req,res)=>{
    try{
        const id = req.params.id;
        const owner = await Owners.findOne(toId(id));
        res.json(owner);
    } catch(err){res.json({error: err})}

};

const addOwner = async (req, res)=>{
    try{
        const data = req.body;
        await new Owners(data).save();
        res.send('success');
    } catch(err){res.json({error: err})}
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
