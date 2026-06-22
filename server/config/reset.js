// Import the database connection pool
import { pool } from './database.js'
// Import environment variables config
import './dotenv.js'
// Import the local mock data array
import arr from '../data/gifts.js'

// Define async function to build the table
const mkTbl = async () => {
    // SQL command to drop existing and create a new table
    const sql = `
        DROP TABLE IF EXISTS gifts;
        CREATE TABLE IF NOT EXISTS gifts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            audience VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            submittedBy VARCHAR(255) NOT NULL,
            submittedOn TIMESTAMP NOT NULL
        )
    `
    try {
        // Execute the table creation query
        await pool.query(sql)
        // Log success message to the console
        console.log('gifts table created successfully')
    } catch (err) {
        // Log any errors that occur during creation
        console.error('error creating gifts table', err)
    }
}

// Define async function to populate the table
const seedTbl = async () => {
    // Wait for the table to be created first
    await mkTbl()

    // Loop through each object in the data array
    arr.forEach((obj) => {
        // Define the SQL insert statement
        const qry = {
            text: 'INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }
        // Map the object properties to an array of values
        const vals = [
            obj.name,
            obj.pricePoint,
            obj.audience,
            obj.image,
            obj.description,
            obj.submittedBy,
            obj.submittedOn
        ]

        // Execute the insert query for the current item
        pool.query(qry, vals, (err, res) => {
            if (err) {
                // Log any insertion errors
                console.error('error inserting gift', err)
                return
            }
            // Log success for the specific item
            console.log(`${obj.name} added successfully`)
        })
    })
}

// Execute the seeding process immediately
seedTbl()