const express = require('express')
const app = express()
const path = require('path')
const request = require('request');
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/recipes/:ingredient', function (req, res) {
  let ingredient = req.params.ingredient
  request(`https://recipes-goodness.herokuapp.com/recipes/${ingredient}`, function (error, resp, body) {
    if (!error) {
      res.send(JSON.parse(body))
    }
  })
})

const port = 8080
app.listen(port, function () {
  console.log(`Running server on port ${port}`)
})