import mongoose from "mongoose";
const { Schema } = mongoose;

const OceanicParametersSchema = new Schema({
    ParameterID: {
        type: String,
        default: () => require('uuid').v4(),
        unique: true,
    },
    BeachID: {
        type: String,
        required: true,
    },
    WaveHeight: Number,
    OceanCurrents: Number,
    TideLevel: Number,
    SwellSurge: Boolean,
    StormSurge: Boolean,
    TsunamiAlert: Boolean,
    Timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('OceanicParameters', OceanicParametersSchema);
