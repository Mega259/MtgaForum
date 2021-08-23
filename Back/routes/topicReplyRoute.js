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
const collection = "topicReply"

router.delete('/', verifyToken, verifyRole.verifyMod, async (req, res) => {
  console.log('Deleting topic reply')
  try {
    const deletedCat = await deleteElementFromCollection(collection, req.query.id)
    res.status(200).json({ "message": "ok", "data": deletedCat })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.get('/', async (req, res) => {
  console.log('Getting topics replies from topic')
  try {
    const allCats = await getElementsFromCollection(collection, req.query)
    res.status(200).json({ "message": "ok", "data": allCats })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.post('/', verifyToken, async (req, res) => {
  console.log('Adding Topic reply')
  console.log(req.body)
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
  console.log('Updating Topic reply')
  try {
    let prev = await getElementFromCollection(collection, req.body._id)
    if (String(prev.userId) === req.user.id) {
      prev.title = req.body.title
      prev.content = req.body.content
      prev.updatedAt = new Date()
      console.log(prev)
      const updateCat = await updateElementFromCollection(collection, prev)
      res.status(200).json({ "message": "ok", "data": updateCat })
    } else {
      res.status(404).json({ "message": "Access Denied" })
    }

  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})


export default router