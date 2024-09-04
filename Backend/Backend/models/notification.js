import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    NotificationID: {
        type: String,
        default: () => require('uuid').v4(),
        unique: true,
    },
    UserID: {
        type: String,
        required: true,
    },
    BeachID: {
        type: String,
        required: true,
    },
    Message: String,
    Timestamp: {
        type: Date,
        default: Date.now,
    },
    IsRead: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Notification', NotificationSchema);
