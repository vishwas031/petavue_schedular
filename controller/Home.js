import User from '../models/user.js';

export async function myDetails(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    res.json({ user });
  } catch (error) {
    console.error('Error getting my details', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}