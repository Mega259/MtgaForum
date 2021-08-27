import express from 'express'
import {
  addElementToCollection,
  deleteElementFromCollection,
  getElementsFromCollection,
  getElementFromCollection,
  getElementsFromCollectionQuery,
  updateElementFromCollection
} from '../controllers/mongoQueries.js'
import verifyRole from '../middlewares/verifyRole.js'
import verifyToken from '../middlewares/verifyToken.js'


let router = express.Router();
const collection = "topic"

router.post('/', verifyToken, async (req, res) => {
  console.log('Adding Topic')
  try {
    const constructedElement = req.body
    constructedElement.userId = req.user.id
    constructedElement.createdAt = new Date()
    constructedElement.updatedAt = constructedElement.createdAt
    const element = await addElementToCollection(collection, constructedElement)
    res.status(200).json({ "message": "ok", "data": element })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.put('/', verifyToken, async (req, res) => {
  console.log('Updating Topic')
  try {
    let prev = await getElementFromCollection(collection, req.body._id)
    if (String(prev.userId) === req.user.id) {
      prev.title = req.body.title
      prev.content = req.body.content
      prev.updatedAt = new Date()
      const updateCat = await updateElementFromCollection(collection, prev)
      res.status(200).json({ "message": "ok", "data": updateCat })
    } else {
      res.status(404).json({ "message": "Access Denied" })
    }

  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.delete('/', verifyToken, verifyRole.verifyMod, async (req, res) => {
  console.log('Deleting topic')
  try {
    const deletedCat = await deleteElementFromCollection(collection, req.query.id)
    res.status(200).json({ "message": "ok", "data": deletedCat })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.get('/', async (req, res) => {
  console.log('Getting topics from category')
  try {
    const allCats = await getElementsFromCollection(collection, req.query)
    res.status(200).json({ "message": "ok", "data": allCats })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.get('/byId', async (req, res) => {
  console.log('Getting the topic of id')
  try {
    const allCats = await getElementFromCollection(collection, req.query.id)
    res.status(200).json({ "message": "ok", "data": allCats })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.put('/move', verifyToken, verifyRole.verifyMod, async (req, res) => {
  console.log('Moving the topic of category')
  try {
    let prev = await getElementFromCollection(collection, req.query.id)
    prev.categoryId = req.query.categoryId
    prev.updatedAt = new Date()
    const updateCat = await updateElementFromCollection(collection, prev)
    res.status(200).json({ "message": "ok", "data": updateCat })

  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.put('/upvote', verifyToken, async (req, res) => {
  console.log('Upvoting topic')
  try {
    let upVotedTopic = await getElementFromCollection(collection, req.query.id)
    if (upVotedTopic.upvotes.filter(el => String(el.userId) === req.user.id).length > 0) {
      upVotedTopic.upvotes = upVotedTopic.upvotes.filter(el => String(el.userId) !== req.user.id)
      upVotedTopic.upvotes.push({ "userId": req.user.id, "upvote": true })
    } else {
      upVotedTopic.upvotes.push({ "userId": req.user.id, "upvote": true })
    }
    upVotedTopic.save()
    res.status(200).json({ "message": "ok", "data": upVotedTopic })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.put('/downvote', verifyToken, async (req, res) => {
  console.log('Upvoting topic')
  try {
    let upVotedTopic = await getElementFromCollection(collection, req.query.id)
    if (upVotedTopic.upvotes.filter(el => String(el.userId) === req.user.id).length > 0) {
      upVotedTopic.upvotes = upVotedTopic.upvotes.filter(el => String(el.userId) !== req.user.id)
      upVotedTopic.upvotes.push({ "userId": req.user.id, "upvote": false })
    } else {
      upVotedTopic.upvotes.push({ "userId": req.user.id, "upvote": false })
    }
    upVotedTopic.save()
    res.status(200).json({ "message": "ok", "data": upVotedTopic })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.get('/fullTopic', async (req, res) => {
  console.log('Getting a topic and his responses')
  try {
    const topic = await getElementFromCollection(collection, req.query.id)
    const topicReplies = await getElementsFromCollection("topicReply", { "topicId": req.query.id })
    res.status(200).json({ "message": "ok", "data": { "topic": topic, "topicReplies": topicReplies } })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.get('/allTopicsCategory', async (req, res) => {
  console.log('Getting all topics from this category')
  try {
    const category = await getElementsFromCollectionQuery("category", { "title": req.query.title })
    const categoryId = category._id
    const topicReplies = await getElementsFromCollection(collection, { "categoryId": categoryId })
    const result = {}
    result[req.query.title] = topicReplies
    res.status(200).json({ "message": "ok", "data": result })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

export default router