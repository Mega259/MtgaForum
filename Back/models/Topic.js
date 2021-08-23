import mongoose from 'mongoose'

const upvotesSchema = new mongoose.Schema({
  _id: false,
  userId: { type: mongoose.Types.ObjectId, requirded: true },
  upvote: { type: Boolean, required: true }
})

const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
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
  upvotes: [upvotesSchema],
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('Topic', TopicSchema);