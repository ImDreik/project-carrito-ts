import { Schema, model } from "mongoose";


const productSchema = new Schema({

    name: {
        type: String,
        requered: [true, 'Name is required'],
        unique: true
    },
    available: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'Missing user']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: [true, 'Missing cateogy']
    }

});

export const productModel = model('Product', productSchema);