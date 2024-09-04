import mongoose from "mongoose";
const { Schema } = mongoose;

const SuitabilityAssessmentSchema = new Schema({
    AssessmentID: {
        type: String,
        default: () => require('uuid').v4(),
        unique: true,
    },
    BeachID: {
        type: String,
        required: true,
    },
    Timestamp: {
        type: Date,
        default: Date.now,
    },
    IsSuitable: {
        type: Boolean,
        required: true,
    },
    Reason: String,
    ColorCode: String,
});

module.exports = mongoose.model('SuitabilityAssessment', SuitabilityAssessmentSchema);
