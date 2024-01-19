import User from '../models/user.js';
import { CreateAllSlots, getAvaliableSlots, getBookedSlots } from '../utils/helper.js';

export async function registerMeet(req, res) {
  const { email, startTime, endTime, interval, bufferTime } = req.body;
  try {
    const calculatedSlots = CreateAllSlots(startTime, endTime, interval, bufferTime);
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // const bookedEvents = getBookedSlots(startTime, endTime)
    // const freeSlots = getAvaliableSlots(bookedEvents,calculatedSlots)
    user.availableSlots = calculatedSlots;
    await user.save();
    res.json({ message: 'Slots registered successfully', user });
  } catch (error) {
    console.error('Error registering slots:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}
