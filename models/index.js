import mongoose from 'mongoose';


const { Schema } = mongoose;

const pets = new Schema(
    {
    Pet: String,
    PetName: String
});



const owners = new Schema({

});

const kennel = new Schema({

});

const Pets = mongoose.model('Pets', pets);
const Owners = mongoose.model('Owners', owners);
const Kennel = mongoose.model('Kennel', kennel);


export { Pets, Owners, Kennel };