const mongoose = require('mongoose');

const { Schema } = mongoose;

const tradeSchema = new Schema({
    currentOwner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    requestor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'refused'] }
}, { timestamps: true });

const TradeRequest = mongoose.model('TradeRequest', tradeSchema);

module.exports = TradeRequest;
