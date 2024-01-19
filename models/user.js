import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isAvailable: { type: Boolean, default: true },
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  accessToken: { type: String },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
  bufferTime: { type: Number, required: false },
  interval: { type: Number, required: false },
  availableSlots: [SlotSchema],
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;