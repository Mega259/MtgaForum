import express from 'express'
import { addElementToCollection, deleteElementFromCollection, getElementsFromCollection, updateElementFromCollection } from '../controllers/mongoQueries.js'
import jwt from 'jsonwebtoken'
import verifyRole from '../middlewares/verifyRole.js'
import verifyToken from '../middlewares/verifyToken.js'


let router = express.Router();
const collection = "category"

router.post('/', verifyToken, verifyRole, async (req, res) => {
  console.log('Adding Category')
  try {
    const newCat = await addElementToCollection(collection, req.body)
    res.status(200).json({ "message": "ok", "_id": newCat._id })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.put('/', verifyToken, verifyRole, async (req, res) => {
  console.log('Updating categories')
  try {
    const updateCat = await updateElementFromCollection(collection, req.body)
    res.status(200).json({ "message": "ok", "data": updateCat })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.delete('/', verifyToken, verifyRole, async (req, res) => {
  console.log('Deleting category')
  try {
    const deletedCat = await deleteElementFromCollection(collection, req.body)
    res.status(200).json({ "message": "ok", "data": deletedCat })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

router.get('/', async (req, res) => {
  console.log('Getting all categories')
  try {
    const allCats = await getElementsFromCollection(collection, req.body)
    res.status(200).json({ "message": "ok", "data": allCats })
  } catch (e) {
    res.status(400).json({ "message": e.message })
  }
})

export default router