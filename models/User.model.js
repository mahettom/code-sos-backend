const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      maxLength: 20,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePic: {
      type: String,
    },
    isTutor: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
)
const User = model('User', userSchema)
module.exports = User