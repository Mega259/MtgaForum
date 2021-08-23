import mongoose from 'mongoose'


const TopicReplySchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  upvotes: [{
    _id: false,
    userId: { type: mongoose.Types.ObjectId, requirded: true },
    upvote: { type: Boolean, required: true }
  }],
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