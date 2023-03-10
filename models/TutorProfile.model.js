const { model, Schema } = require('mongoose')

const tutorProfileSchema = new Schema(
    {
        tutor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        available: {
            type: Boolean,
            default: false,
        },
    }
)
const TutorProfile = model('TutorProfile', tutorProfileSchema)
module.exports = TutorProfile