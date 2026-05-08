const mongoose = require('mongoose');

const ScreamSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        maxlenght: 280,
    },
    emoji: {
        type: String,
        enum: ['😤', '🤯', '🔥', '😂', '😱', '🎉', '💀', '🗣️'],
        default: '🗣️',
    },
    intensity: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
    },
    reactions: {
        fire: {
            type: Number,
            default: 0,
        },
        laugh: { type: Number, default: 0 },
        shock: { type: Number, default: 0 },
        hype: {
            type: Number,
            default: 0,
        },
    },
    // АВТО-УДАЛЕНИЕ ЧЕРЕЗ 24 ЧАСА
    createdAt: {
        type: Date,
        default: Date.now,
        experies: 86400,
    },
});

ScreamSchema.index({ 'reactions.fire': -1, createdAt: -1 });

module.exports = mongoose.model('Scream', ScreamSchema);
