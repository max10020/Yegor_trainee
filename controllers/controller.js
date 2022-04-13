import {Pets, Owners, Kennel} from "../models/index";
import mongoose from "mongoose";

const toId = mongoose.Types.ObjectId;

const getElement =  async (req, res)=>{
    try{
        const id = req.params.id;
        const data = await Pets.findById(id);
        res.json({data});
    } catch(err) {res.render('error', {error: err})}
};


const addElement = async (req, res) => {
    try{
        const data = req.body;
        await new Pets(data).save();
        res.send('Element added');
    } catch(err) {res.render('error', {error: err})}
};

const deleteElement = async (req, res)=> {
    try{
        const id = req.params.id;
        await Pets.findByIdAndDelete(id);
        res.send('Element deleted')
    } catch(err) {res.render('error', {error: err})}
};


export { getElement, addElement, deleteElement };