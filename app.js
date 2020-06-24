var express = require("express")
var chalk = require("chalk")
var debug = require("debug")("app")
var morgan = require("morgan")
var path = require("path")

var app = express()

// Debugging like papertail
app.use(morgan("tiny"))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views/index.html"))
})

app.listen(4242, function () {
  debug(`Listening on port ${chalk.green(3000)}`)
})
