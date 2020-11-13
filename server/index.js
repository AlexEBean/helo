require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session');
const ctrl = require("./controller")

const app = express()

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
const port = SERVER_PORT

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db)
    console.log("Connected to DB")
})

app.post("/auth/register", ctrl.register)
app.post("/auth/login", ctrl.login)


app.get("/api/posts/:user_id", ctrl.getPosts)

app.listen(port, () => console.log(`Server is listening on port ${port}`))