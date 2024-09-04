import mongoose from "mongoose";
const { Schema } = mongoose;

const WaterQualitySchema = new Schema({
    ParameterID: {
        type: String,
        default: () => require('uuid').v4(),
        unique: true,
    },
    BeachID: {
        type: String,
        required: true,
    },
    pHLevel: Number,
    DissolvedOxygen: Number,
    Turbidity: Number,
    BacterialCount: Number,
    ContaminantLevels: {
        type: Map,
        of: String,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('WaterQuality', WaterQualitySchema);
