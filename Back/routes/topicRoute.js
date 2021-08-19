import express from 'express'
import { addElementToCollection, deleteElementFromCollection, getElementsFromCollection, getElementFromCollection, getElementsFromCollectionQuery, updateElementFromCollection } from '../controllers/mongoQueries.js'
import jwt from 'jsonwebtoken'
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
    constructedElement.updatedAt = new Date()
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
    console.log(prev)
    if (prev.userId === req.user.id) {
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

router.delete('/', verifyToken, verifyRole.verifyMod, async (req, res) => {
  console.log('Deleting topic')
  try {
    const deletedCat = await deleteElementFromCollection(collection, req.body)
    res.status(200).json({ "message": "ok", "data": deletedCat })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.get('/', async (req, res) => {
  console.log('Getting topics from category')
  try {
    const allCats = await getElementsFromCollectionQuery(collection, req.body)
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

export default router