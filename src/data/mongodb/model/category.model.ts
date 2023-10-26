import { Schema, model } from "mongoose";


const categorySchema = new Schema({

    name: {
        type: String,
        requered: [true, 'Name is required'],
        unique: true
    },
    available: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'Missing user']
    }

});

export const CategoryModel = model('Category', categorySchema);