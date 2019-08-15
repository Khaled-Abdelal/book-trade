const mongoose = require('mongoose');

const { Schema } = mongoose;

const tradeSchema = new Schema({
    currentOwner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookRequestor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }
}, { timestamps: true });

const TradeRequest = mongoose.model('TradeRequest', tradeSchema);

module.exports = TradeRequest;
