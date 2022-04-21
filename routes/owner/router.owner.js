"use strict";
import {Router} from "express";
import mongoose from "mongoose";
import {Owners, Pets, } from "../../models/index.js";

const toId = mongoose.Types.ObjectId;

const ownerRouter = Router();

ownerRouter.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const owner = await Owners.findOne(toId(id));
        res.json(owner);
    }catch(err){res.render('error', {error: err} ) }

})

ownerRouter.post('/add', async (req, res)=>{
    try{
        const data = req.body;
        await new Owners(data).save();
        res.send('success');
    } catch(err){res.render('error', {error: err} ) }

})

ownerRouter.put('/:owner/:pet', async(req, res)=>{
    try{
        const { owner } = req.params;
        const { pet } = req.params;

        await Owners.findOneAndUpdate(toId(owner), {$push: {pet: toId(pet)}});
        await Pets.findOneAndUpdate(toId(pet), {$push: {owner: toId(owner)}});

        res.send('Adopted');

    } catch(err){res.render('error', {error: err} ) }
})




export {ownerRouter};
