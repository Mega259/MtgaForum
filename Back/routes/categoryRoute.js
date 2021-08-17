import express from 'express'
import { addElementToCollection, deleteElementFromCollection, getElementsFromCollection, updateElementFromCollection } from '../controllers/mongoQueries.js'
import jwt from 'jsonwebtoken'
import verifyRole from '../middlewares/verifyRole.js'

let router = express.Router();
const collection = "Category"

router.post('/', async (req, res) => {
  console.log('Adding Category')
  try {
    const newCat = await addElementToCollection("Category", category)
  } catch (e) {
    res.status(400).json(message: e.message)
  }
})

