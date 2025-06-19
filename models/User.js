import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        bio: {
            type: String,
            default: '',
        },
        avatarUrl: {
            type: String,
        },
        socialLinks: {
            github: { type: String },
            linkedin: { type: String },
            twitter: { type: String },
            website: { type: String },
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
)
export default mongoose.models.User || mongoose.model('User', UserSchema)
