import mongoose from 'mongoose'


const MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
})

export default mongoose.model('Message', MessageSchema);