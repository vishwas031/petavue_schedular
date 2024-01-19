import UserModel from "../models/user.js"

export async function availableSlots(req, res) {
    try {
        const email = req.params.id
        const data = await UserModel.findOne({ email })
        const availableSlots = data.availableSlots.filter(slot => slot.isAvailable)
        res.json(availableSlots)
    } catch (err) {
        res.status(500).json(err);
    }
}