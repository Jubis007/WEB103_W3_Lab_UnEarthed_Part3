// Import the db pool
import { pool } from '../config/database.js'

// Func to get all gifts
const getGifts = async (req, res) => {
    try {
        // Query all gifts
        const dbRes = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
        // Send rows to client
        res.status(200).json(dbRes.rows)
    } catch (err) {
        // Send error
        res.status(409).json({ error: err.message })
    }
}

// Func to get one gift by id
const getGiftById = async (req, res) => {
    try {
        // SQL query string
        const qry = `
            SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn
            FROM gifts
            WHERE id=$1
        `
        // Get id from url param
        const gId = req.params.giftId
        
        // Execute query
        const dbRes = await pool.query(qry, [gId])
        
        // Send first row to client
        res.status(200).json(dbRes.rows[0])
    } catch (err) {
        // Send error
        res.status(409).json({ error: err.message })
    }
}

// Export both funcs
export default {
    getGifts,
    getGiftById
}