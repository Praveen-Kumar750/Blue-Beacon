import mongoose from "mongoose";
const { Schema } = mongoose;

const APIInteractionSchema = new Schema({
    APIRequestID: {
        type: String,
        default: () => require('uuid').v4(),
        unique: true,
    },
    RequestType: String,
    Parameters: {
        type: Map,
        of: String,
    },
    Response: {
        type: Map,
        of: String,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('APIInteraction', APIInteractionSchema);
