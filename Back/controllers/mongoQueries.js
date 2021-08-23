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

async function deleteElementFromCollection(collection, id) {
  return await db[collection].findByIdAndDelete(id)
}

async function getElementsFromCollection(collection, query = {}) {
  return await db[collection].find(query)
}

async function getElementFromCollection(collection, _id) {
  return await db[collection].findOne({ "_id": _id })
}

async function getElementsFromCollectionQuery(collection, query) {
  return await db[collection].findOne(query)
}

async function updateElementFromCollection(collection, element, newElement = {}, options = {}) {
  try {
    if (newElement !== {}) {
      return await db[collection].updateOne({ _id: element._id }, element)
    } else {
      return await db[collection].updateOne({ _id: element._id }, newElement, options)
    }
  } catch (e) {
    console.log(e)
  }
}

export {
  addElementToCollection,
  deleteElementFromCollection,
  getElementsFromCollection,
  getElementFromCollection,
  getElementsFromCollectionQuery,
  updateElementFromCollection
}