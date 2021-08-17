import db from './mongoController.js'
import Category from '../models/Category.js'
import Message from '../models/Message.js'
import Topic from '../models/Topic.js'
import TopicReply from '../models/TopicReply.js'
import Users from '../models/User.js'

const modelClasses = {
  "Category": Category,
  "Message": Message,
  "Topic": Topic,
  "TopicReply": TopicReply,
  "Users": Users
}

async function addElementToCollection(collection, element) {
  return await new db[collection](element).save()
}

async function deleteElementFromCollection(collection, element) {
  return await db[collection].findByIdAndDelete(element._id)
}

async function getElementsFromCollection(collection) {
  return await db[collection].find()
}

async function updateElementFromCollection(collection, element) {
  console.log(element)
  return await db[collection].updateOne({ _id: element._id }, element)
}

export {
  addElementToCollection,
  deleteElementFromCollection,
  getElementsFromCollection,
  updateElementFromCollection
}