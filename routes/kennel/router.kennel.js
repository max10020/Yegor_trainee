"use strict";
import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import {Kennel, Pets} from "../../models/index.js";

const toId = mongoose.Types.ObjectId;

let kennelRouter = Router();

kennelRouter.get('/:id', async (req,res)=>{
    const id = req.params.id;
    const kennel = await Kennel.findById(toId(id));
    res.json(kennel);
})

kennelRouter.post("/add", async (req,res)=>{
    const data = req.body;
    await new Kennel(data).save();
    res.send('Kennel added');
})

kennelRouter.put('/:kennel/:pet', async (req, res)=>{
    const { kennel } = req.params;
    const { pet } = req.params;

    await Kennel.findOneAndUpdate(toId(kennel), {$push: {pet: toId(pet)}});
    await Pets.findOneAndUpdate(toId(pet), {$push: {kennel: toId(kennel)}});

    res.send('Adopted')
})





export {kennelRouter};