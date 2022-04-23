import mongoose from 'mongoose';

const { Schema } = mongoose;

const PetsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Error: `Name` is requires"]},
        kind: {
            type: String,
            lowercase: true,
            required: [true, "Error: 'kind' is required"],
            enum: {
                values: ["dog", "cat", "rabbit"],
                message: "{VALUE} is not supported"
            }},
        owner: {type: Schema.Types.ObjectId, ref: 'Owners', required: false},
        kennel: {type: Schema.Types.ObjectId, ref: 'Kennel', required: false}
    });

const Pets = mongoose.model('Pets', PetsSchema);

export default Pets;