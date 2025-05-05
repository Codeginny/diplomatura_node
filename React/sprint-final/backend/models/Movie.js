// models/Movie.js
import mongoose from 'mongoose';

const ageRatings = ["ATP","+18"];

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ageRating: {
    type: String,
    enum: ageRatings,
    required: true,
    default: "ATP"
  },
  category: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
