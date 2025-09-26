var express = require('express')

const SERVER_PORT = 8089
var app = express()

// static middleware
app.use("/test", express.static("./public"))
app.use(express.json())
//app.use(express.text())
//https://expressjs.com/en/4x/api.html#express.urlencoded
app.use(express.urlencoded({extended: true}))

//http://localhost:8089/index
// app.get("/index", (req, res) => {
//     res.sendFile(__dirname + "/public/index.html")
// })

//http://localhost:8089/
app.get("/hello", (req, res) => {
    res.type("text/plain").send("Hello Express JS")
})

app.get("/home", (req, res) => {
    res.send("Home Page")
})

app.get("/user", (req, res) => {
    const firstname = req.query.firstname || "Karina"
    const lastname = req.query.lastname || "Vetlugina"
    res.json({ firstname, lastname })
})

app.post("/user/:firstname/:lastname", (req, res) => {
    const { firstname, lastname } = req.params
    res.json({ firstname, lastname })
})

app.post("/users", (req, res) => {
    const users = Array.isArray(req.body) ? req.body : [];
    res.json(users);
})

// initializing the server
app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})