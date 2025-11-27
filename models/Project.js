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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme',
        required: false,
        default: null
    },
    urlSlug:{
      type: String,
      required:true,
      unique: true,
      default:""
    },
    visibillity:{
      type:String,
      required: true,
      default:"private",
      enum: visibillityType
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)