import mongoose from 'mongoose';

const visibillityType = [
  "public",
  'private'
]
const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    theme:{
        type: mongoose.Schema.Types.Mixed,
        default:{}
    },
    visibillity:{
      type:String,
      required: true,
      default:"private",
      enum: visibillityType
    },
    section: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)