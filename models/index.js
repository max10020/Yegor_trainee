import mongoose from 'mongoose';

const { Schema } = mongoose;

const PetsSchema = new Schema(
    {
    name: String,
    kind: String,
    owner: {type: Schema.Types.ObjectId, ref: 'Owners', required: false},
    kennel: {type: Schema.Types.ObjectId, ref: 'Kennel', required: false}
});

const OwnersSchema = new Schema({
    name: String,
    phone: String,
    pet: [{type: Schema.Types.ObjectId, ref: 'Pets', required: false}]
});

const KennelSchema = new Schema({
    company: String,
    rating: String,
    pet: [{type: Schema.Types.ObjectId, ref: 'Pets', required: false}]
});

const Pets = mongoose.model('Pets', PetsSchema);
const Owners = mongoose.model('Owners', OwnersSchema);
const Kennel = mongoose.model('Kennel', KennelSchema);


export { Pets, Owners, Kennel };
