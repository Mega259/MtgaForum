import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Message from '../models/Message.js';
import Topic from '../models/Topic.js';
import TopicReply from '../models/TopicReply.js'
import User from '../models/User.js';

const mongo_url = process.env.MONGO_URL
const mongo_port = process.env.MONGO_PORT
const mongo_user = process.env.MONGO_USER
const mongo_pass = process.env.MONGO_PASS

console.log(mongo_url, mongo_port, mongo_user, mongo_pass)

const db = {}
db.mongoose = mongoose
db.user = User
db.category = Category
db.message = Message
db.topic = Topic
db.topicReply = TopicReply

db.mongoose.connect(`mongodb://${mongo_user}:${mongo_pass}@${mongo_url}:${mongo_port}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: 'Forum'
}).then(() => console.log('Connected!')).catch(err => console.log(err))

export default db

// async function addElementToCollection(collection, element, userData) {
//   let toAdd = []
//   if (collection === "Events") {
//     toAdd = await new Event({
//       total: element.total,
//       date: element.date,
//       place: element.place,
//       savings: element.savings,
//       items: 'items' in element ? element.items : [],
//       type: element.type,
//       users: [{ user: userData.id, percentage: 100 }]
//     }).save()
//   }
//   else if (collection === "EventItems") {
//     const eventCheck = await Event.findById(element.event)
//     const check = eventCheck.users.find(us => us.user === userData.id)
//     if (check != null) {
//       toAdd = await new EventItem({
//         name: element.name,
//         price: element.price,
//         quantity: element.quantity,
//         quantityUnit: element.quantityUnit,
//         event: element.event,
//         category: element.category
//       }).save()
//       const updatedEvent = await Event.findByIdAndUpdate(element.event, { "$push": { "items": toAdd._id } })
//     } else {
//       throw 'Estás intentando trolear'
//     }

//   }
//   return toAdd
// }

// async function deleteElementFromCollection(collection, element, userData) {
//   let toDelete = []
//   if (collection === "Events") {
//     toDelete = await Event.find({ _id: element._id, "users.user": userData.id })
//     const itemsToDelete = toDelete.items.map(async id => await EventItem.findByIdAndDelete(id))
//     toDelete = await Event.findByIdAndDelete(toDelete._id)
//   }
//   else if (collection === "EventItems") {
//     const eventCheck = await Event.findById(element.event).users.find(us => us.user === userData.id)
//     if (eventCheck != null) {
//       toDelete = await EventItem.findByIdAndDelete(toDelete._id)
//     } else {
//       throw 'Estás intentando trolear'
//     }
//   }
//   return toDelete
// }

// async function getElementsFromCollection(collection, userData) {
//   let toReturn = []
//   const userEvents = await Event.find({ "users.user": userData.id })
//   if (collection === "Events") {
//     toReturn = userEvents
//   } else if (collection === "EventItems") {
//     const userEventItems = userEvents.map(item => item.items).flat()
//     for (const item in userEventItems) {
//       console.log(userEventItems[item])
//       const elem = await EventItem.findById(userEventItems[item])
//       console.log(elem)
//       toReturn.push(elem)
//     }
//     // toReturn = userEventItems.map(async id => await EventItem.findOne({_id: id}))
//   }
//   return toReturn
// }

// async function updateElementFromCollection(collection, element, userData) {
//   let toReturn = []
//   if (collection === "Events") {
//     toReturn = await Event.updateOne({ _id: element._id, "users.user": userData.id }, element)
//   } else if (collection === "EventItems") {
//     const eventCheck = await Event.findById(element.event).users.find(us => us.user === userData.id)
//     if (eventCheck != null) {
//       toReturn = await EventItem.findByIdAndUpdate(element._id, element)
//     } else {
//       throw 'Estás intentando trolear'
//     }
//   }
//   return toReturn
// }
// 
// export {
//   addElementToCollection,
//   deleteElementFromCollection,
//   getElementsFromCollection,
//   updateElementFromCollection
// }
