const express = require('express')
const auth = require('../middleware/auth')
const TradeRequest = require('../models/TradeRequest')
const User = require('../models/User')
const Book = require('../models/Book')



const router = express.Router()

router.post('/', auth, async (req, res) => {
    const { currentOwner, requestor, book } = req.body;
    try {
        const tradeRequest = await new TradeRequest({ currentOwner, requestor, book }).save();
        return res.send(tradeRequest);
    } catch (e) {
        return res.status(500).send(err);
    }
})

router.get('/:userId', auth, async (req, res) => {
    if (req.user._id != req.params.userId) return res.status(400).send({ error: { message: "this is not your profile" } })
    try {
        const requests = await TradeRequest.find({ currentOwner: req.user._id, status: 'pending' }, null, { createdAt: -1 }).populate('currentOwner').populate('requestor').populate({ path: 'book', populate: { path: 'owner' } })
        return res.send(requests)
    } catch (e) {
        return res.status(500).send()
    }
})

router.put('/accept', auth, async (req, res) => {
    /**  
     * mongoose didn't support transactions without replica 
     * need to find another way or use replica
     * **/
    try {
        const request = await TradeRequest.findById(req.body.tradeId)

        if (req.user._id.toString() != request.currentOwner.toString() || request.status != 'pending') return res.status(403).send()

        request.status = 'accepted'
        const newOwner = await User.findOneAndUpdate({ _id: request.requestor }, { $inc: { numberOfBooks: 1 } }, { new: true })
        await User.findOneAndUpdate({ _id: request.currentOwner }, { $inc: { numberOfBooks: -1 } })
        await Book.findOneAndUpdate({ _id: request.book }, { owner: newOwner._id })
        const updatedRequest = await request.save()
        return res.status(200).send(updatedRequest)

    } catch (e) {
        return res.status(500).send()
    }
})

router.put('/refuse', auth, async (req, res) => {

    try {
        const request = await TradeRequest.findById(req.body.tradeId)

        if (req.user._id.toString() != request.currentOwner.toString() || request.status != 'pending') return res.status(403).send()
        request.status = 'refused'
        const updatedRequest = await request.save()
        return res.status(200).send(updatedRequest)

    } catch (e) {
        return res.status(500).send()
    }
})


module.exports = router