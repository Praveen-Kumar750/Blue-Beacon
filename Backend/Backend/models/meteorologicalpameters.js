import mongoose from "mongoose";
const { Schema } = mongoose;

const MeteorologicalParametersSchema = new Schema({
    ParameterID: {
        type: String,
        default: () => require('uuid').v4(),
        unique: true,
    },
    BeachID: {
        type: String,
        required: true,
    },
    WindSpeed: Number,
    WindDirection: Number,
    AirTemperature: Number,
    Humidity: Number,
    WeatherCondition: String,
    Timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('MeteorologicalParameters', MeteorologicalParametersSchema);
