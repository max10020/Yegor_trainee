import mongoose from 'mongoose';
const { Schema } = mongoose;


const OwnersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'field "name" is missing']},
    phone: {
        type: String,
        required: [true, 'field "phone" number is missing'],
        validate: {
            validator: (v)=>{
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`}
        },
    username: {
        type: String,
        required: [true, "field 'login' is missing"]
    },
    password: {
        type: String,
        required: [true, "field 'password' is missing"]
    },
    token: {
        type: String
    },
    pet: [{type: Schema.Types.ObjectId, ref: 'Pets', required: false}]
});

const Owners = mongoose.model('Owners', OwnersSchema);

export default Owners;