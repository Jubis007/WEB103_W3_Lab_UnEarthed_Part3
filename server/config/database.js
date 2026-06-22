import pg from 'pg'

const config = {
    // Hardcoding the URL temporarily to bypass the .env bug
    connectionString: "postgresql://unearthed_dqqu_user:mmXNKzUvt0ow6g8gz5RvhP0y1zhN6KsF@dpg-d8l0ujbtqb8s73alrfjg-a.virginia-postgres.render.com/unearthed_dqqu",
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)