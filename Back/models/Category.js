import mongoose from 'mongoose'


var CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
})

var Category = mongoose.model('Category', CategorySchema);