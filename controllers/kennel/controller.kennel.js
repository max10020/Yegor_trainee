import Pets from "../../models/pet/Pet.js"
import Kennel from "../../models/kennel/Kennel.js";
import mongoose from "mongoose";
import { handleErrors } from "../controller.js";

const toId = mongoose.Types.ObjectId;

const getKennel = async (req, res)=>{
    try{
        const id = req.params.id;
        const kennel = await Kennel.findById(toId(id));
        res.json(kennel);
    } catch(err){handleErrors(err, res)}
}


const addKennel = async (req, res)=>{
    try{
        const data = req.body;
        const dataKey = Object.keys(data);

        if(!dataKey.includes("company")){
            return res.status(400).send('"company" is missing');
        } if(!dataKey.includes("rating")){
            return res.status(400).send('"rating" is missing')
        }

        if(dataKey.includes("company") && typeof data.company !== "string"){
            return res.status(400).send(`Wrong value in "company". Must be a string. Your input type: ${typeof data.company}`);
        } else if(dataKey.includes("rating") && typeof data.rating !== "number"){
            return res.status(400).send(`Wrong value in "rating". Must be a number. Your input type: ${typeof data.rating}`);
        }

        await new Kennel(data).save();
        res.send('Kennel added');
    } catch(err){handleErrors(err, res)}
}

const adoptPet = async (req, res)=>{
    try{
        const { kennel } = req.params;
        const { pet } = req.params;

        await Kennel.findOneAndUpdate(toId(kennel), {$push: {pet: toId(pet)}});
        await Pets.findOneAndUpdate(toId(pet), {$push: {kennel: toId(kennel)}});

        res.send('Adopted');
    } catch(err){handleErrors(err, res)}
}

const viewPets = async (req, res)=>{
    try{
        const { id } = req.params;
        const a = await Kennel.findById(toId(id))
            .populate({
                path: "pet",
            })
        res.send(a);
    } catch(err){handleErrors(err, res)}
}

export { getKennel, addKennel, adoptPet, viewPets };