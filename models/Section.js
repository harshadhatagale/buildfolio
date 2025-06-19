import mongoose from 'mongoose';

const SectionType = [
  "nav",
  "hero",
  "about",
  "skills",
  "experience",
  "section",
  "testimonials",
  "footer"
]
const SectionSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    name:{
      type: String,
      required: true,
      default: "Untitled Section"
    },
    type: {
      type: String,
      required: true,
      enum: SectionType,
      default: 'section',
    },
    order: {
      type: Number,
      default: 0
    },
    content: {
      type: Object,
      required: true,
      default: {},
      minimize: false
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);
export default mongoose.models.Section || mongoose.model('Section', SectionSchema);