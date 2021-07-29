import mongoose from 'mongoose'


var TopicReplySchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
})

var TopicReply = mongoose.model('TopicReply', TopicReplySchema);