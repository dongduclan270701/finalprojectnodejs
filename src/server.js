import express from 'express'
import { connectDB } from '*/config/mongodb.js'
import { env } from '*/config/environment'
import { apiV1 } from '*/routes/v1'
const cors = require('cors')
import { corsOptions } from '*/config/cors.js'

connectDB()
    .then(() => console.log('Connected MongoDB successfully to server'))
    .then(() => bootServer())
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
const bootServer = () => {
    const app = express()

    app.use(cors(corsOptions))

    // Enable req.body data
    app.use(express.json())

    // Use APIs v1
    app.use('/v1', apiV1)
    
    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello KassDev, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`)
    })
}