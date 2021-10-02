require("dotenv").config()

const express = require('express')
const app = express()
const mongoose = require("mongoose")
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const port = process.env.PORT || 3000

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Games API",
            desctiption: "Games API Info",
            contact:{
                name: "Piotr Sadkowski"
            },
            servers:["http://localhost:3000"]
        }
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())

const gamesRouter = require("./routes/games")
app.use('/games',gamesRouter)

app.listen(3000, () => console.log("Server started"))

