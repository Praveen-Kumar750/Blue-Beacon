import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    // UserID: {
    //     type: String,
    //     default: () => require('uuid').v4(),
    //     unique: true,
    // },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
      type:String,
      required:true,
    }, 
    password:{
      type:String,
      required:true,
    }, 

    CurrentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },
    Preferences: {
        type: Map,
        of: String,
    },
});
export const User= mongoose.model('User', UserSchema);
