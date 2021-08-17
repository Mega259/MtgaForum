import mongoose from 'mongoose'


const TopicReplySchema = new mongoose.Schema({
  topicId: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0
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

export default mongoose.model('TopicReply', TopicReplySchema);