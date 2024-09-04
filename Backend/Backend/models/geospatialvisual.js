import mongoose from "mongoose";
const { Schema } = mongoose;

const GeospatialVisualizationSchema = new Schema({
    VisualizationID: {
        type: String,
        default: () => require('uuid').v4(),
        unique: true,
    },
    BeachID: {
        type: String,
        required: true,
    },
    SuitabilityColor: String,
    MapCoordinates: {
        type: {
            type: String,
            enum: ['Polygon'],
            default: 'Polygon'
        },
        coordinates: {
            type: [[[Number]]],
            required: true,
        }
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('GeospatialVisualization', GeospatialVisualizationSchema);
