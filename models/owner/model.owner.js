import mongoose from 'mongoose';

const { Schema } = mongoose;

const OwnersSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]},
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: (v)=>{
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`}
        },
    pet: [{type: Schema.Types.ObjectId, ref: 'Pets', required: false}]
});

const Owners = mongoose.model('Owners', OwnersSchema);

export default Owners;