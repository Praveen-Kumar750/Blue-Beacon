const mongoose = require('mongoose');

const BeachSchema = new mongoose.Schema({
    name: String,
    city: String,
    state: String,
    alerts: {
        highWave: Boolean,
        swellSurge: Boolean,
        oceanCurrents: Boolean,
        stormSurge: Boolean,
        tsunami: Boolean,
    },
    windSpeed: Number,
    waterQuality: String, // E.g., 'Good', 'Moderate', 'Poor'
    suitability: String, // 'Suitable' or 'Not Suitable'
});

module.exports = mongoose.model('Beach', BeachSchema);
