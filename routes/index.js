import express from "express"
import { scheduleEvents } from "../controller/scheduleEvent.js"
import { registerMeet } from "../controller/registerMeet.js"
import passport from "passport"
import { availableSlots } from "../controller/availableSlots.js"
import { myDetails } from "../controller/Home.js"
const router = express.Router()

router.post('/home', myDetails)
router.get('/auth/logout', (req,res)=>{
    req.session.destroy();
    res.redirect('/')
})
router.post('/register_meet', registerMeet)
router.post('/available_slots/:id', availableSlots)
router.post('/schedule_event', scheduleEvents)


export default router