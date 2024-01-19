import schedule from 'node-schedule'
import UserModel from '../models/user.js'
import mongoose from 'mongoose';
import "dotenv/config"
console.log(process.env.MONGO_URI);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://Vishwas:123321@1stmernproject.yo1ii.mongodb.net/petavue?retryWrites=true&w=majority');
}
// cron job
// 0 0 * * *  // (this is cron for daily)
schedule.scheduleJob('0 0 * * *', async () => {
    try {
        const users = await UserModel.find({})
        for (const user of users) {
            user.availableSlots.forEach(slot=>{
                slot.isAvailable = false
            })
            await user.save()
        }
    } catch (err) {
        console.log(err);
    }
})