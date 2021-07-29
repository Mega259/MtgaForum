import mongoose from 'mongoose'


var TopicSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  categoryId: {
    type: Date,
    required: true
  }
})

var Topic = mongoose.model('Topic', TopicSchema);