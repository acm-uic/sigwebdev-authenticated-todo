import express from 'express'
import Router from './routes'
import session from 'express-session'
import mongo from 'connect-mongo'
import mongoose from 'mongoose'

// * Init express
const app = express()

// * Setup express session
const MongoStore = mongo(session)
const MongoURL = 'mongodb://localhost/sigwebdev-todo'
app.use(
    session({
        secret: 'ACM Sig Web Dev', // ! In production this should ALWAYS be a random value
        saveUninitialized: true, // ! That noone should ever know
        resave: true,
        cookie: { secure: process.env.NODE_ENV !== 'development' }, // ? Setting secure as true will only set cookies on HTTPS connections
        store: new MongoStore({
            url: MongoURL,
            autoReconnect: true
        })
    })
)

// * Connect mongoose ( JS/TS interface layer with mongodb )
mongoose
    .connect(MongoURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .catch((err: string) => {
        console.error(`MONGO ERROR: ${err}`)
        process.exit()
    })

// * Apply other middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// * Use router
app.use('/', Router)

// * Export express instance
export default app
