import { Schema, model } from "mongoose";


const userSchema = new Schema({

    name: {
        type: String,
        requered: [true, 'Name is required']
    },
    email: {
        type: String,
        requered: [true, 'Email is required'],
        unique: true
    },
    emailValidated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        requered: [true, 'Password is required']
    },
    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    img: {
        type: String
    }

});

export const UserModel = model('User', userSchema);