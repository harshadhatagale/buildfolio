import mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name:{
      type: String,
      required: true,
      default: "Untitled theme"
    },
    colors: {
      type: Object,
      required: true,
      default: {},
      minimize: false
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);
export default mongoose.models.Theme || mongoose.model('Theme', ThemeSchema);