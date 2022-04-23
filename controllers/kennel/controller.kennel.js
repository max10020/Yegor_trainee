import Pets from "../../models/pet/model.pet.js"
import Kennel from "../../models/kennel/model.kennel.js";
import mongoose from "mongoose";

const toId = mongoose.Types.ObjectId;

const getKennel = async (req, res)=>{
    try{
        const id = req.params.id;
        const kennel = await Kennel.findById(toId(id));
        res.json(kennel);
    } catch(err){res.json({error: err})}
}


const addKennel = async (req, res)=>{
    try{
        const data = req.body;
        await new Kennel(data).save();
        res.send('Kennel added');
    } catch(err){res.json({error: err})}
}

const adoptPet = async (req, res)=>{
    try{
        const { kennel } = req.params;
        const { pet } = req.params;

        await Kennel.findOneAndUpdate(toId(kennel), {$push: {pet: toId(pet)}});
        await Pets.findOneAndUpdate(toId(pet), {$push: {kennel: toId(kennel)}});

        res.send('Adopted');
    } catch(err){res.json({error: err})}
}

const viewPets = async (req, res)=>{
    try{
        const { id } = req.params;
        const a = await Kennel.findById(toId(id))
            .populate({
                path: "pet",
            })
        res.send(a);
    } catch(err){res.json({error: err})}
}

export { getKennel, addKennel, adoptPet, viewPets };