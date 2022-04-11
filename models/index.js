import mongoose from 'mongoose';


const { Schema } = mongoose;

const schema = new Schema(
    {
    Owner: String,
    Pet: String
});


const Pets = mongoose.model('Pets', schema)


export default Pets;