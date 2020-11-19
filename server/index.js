require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require("./controller")

const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

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
    app.set("db", db)
    console.log("Connected to DB")
})

app.post("/auth/register", ctrl.register)
app.post("/auth/login", ctrl.login)


app.get("/api/posts/:userId", ctrl.getPosts)
app.get("/api/post/:postId", ctrl.getPost)
app.post("/api/post/:userId", ctrl.addPost)

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`))