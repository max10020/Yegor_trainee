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
        const dataKey = Object.keys(data);

        if(!dataKey.includes('name')){
            return res.status(400).send('"name" is missing')
        } else if (!dataKey.includes('kind')){
            return res.status(400).send('"kind" is missing');
        }

        if(dataKey.includes('name') && typeof data.name !== "string"){
            return res.status(400).send(`\"name\" must be a string. Your input type is:  ${typeof data.name}`);
        } else if (dataKey.includes('kind') && typeof data.kind !== "string"){
            return res.status(400).send(`\"kind\" must be a string. Your input type is:  ${typeof data.kind}`);
        }

        if(!["dog", "cat", "rabbit"].includes(data.kind)){
            return res.status(400).send(`Wrong "kind" type. Must be dog: / rabbit / cat only. Your input: ${data.kind}`)
        }

        await new Pets(data).save();
        res.send('Success');
    } catch(err){handleErrors(err, res)}
};

export {getPet, addPet};