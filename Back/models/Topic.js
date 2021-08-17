import mongoose from 'mongoose'


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
  },
  categoryId: {
    type: String,
    required: true
  }
})

export default mongoose.model('Topic', TopicSchema);