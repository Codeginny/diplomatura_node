// controllers/profileController.js
import Profile from '../models/Profile.js';

const getProfiles = async (req, res) => {
  const profiles = await Profile.find({ userId: req.user.id });
  res.json(profiles);
};

const updateProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(profile);
};

const deleteProfile = async (req, res) => {
  await Profile.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: 'Profile deleted' });
};

export default {
  getProfiles,
  updateProfile,
  deleteProfile,
};
