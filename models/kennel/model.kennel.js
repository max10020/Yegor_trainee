import mongoose from 'mongoose';

const { Schema } = mongoose;

const KennelSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Error: "company" required']},
    rating: {
        type: Number,
        required: [true, 'Error: "rating" required'],
        min: [0, 'Error: invalid rating {VALUE}. Rating can be from 0 to 5'],
        max: [5, 'Error: invalid rating {VALUE}. Rating can be from 0 to 5']},
    pet: [{type: Schema.Types.ObjectId, ref: 'Pets', required: false}]
});

const Kennel = mongoose.model('Kennel', KennelSchema);

export default Kennel;