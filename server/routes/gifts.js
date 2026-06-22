// Import the express library
import express from 'express'

// Import the controller and name it GiftsController
import GiftsController from '../controllers/gifts.js'

// Create a new router instance
const router = express.Router()

// Route to get all gifts
router.get('/', GiftsController.getGifts)

// Route to get a single gift by its id
router.get('/:giftId', GiftsController.getGiftById)

// Export the router to be used in server.js
export default router