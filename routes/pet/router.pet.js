"use strict";
import {Router} from "express";
import mongoose from "mongoose";
import {Pets} from "../../models/index.js";

const toId = mongoose.Types.ObjectId;
const petRouter = Router();

petRouter.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const pet = await Pets.findById(toId(id));
    res.json(pet);
})

petRouter.post('/add', async (req, res)=>{
    const data = req.body;
    await new Pets(data).save();
    res.send('Success');
})

export {petRouter};