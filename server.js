const express = require('express')
const app = express()
const path = require('path')
const request = require('request');
const bodyParser = require('body-parser')

const teamToIDs = {
  "lakers": "1610612747",
  "warriors": "1610612744",
  "heat": "1610612748",
  "suns": "1610612756"
}
let players = []
let dreamTeam = []

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


request('http://data.nba.net/10s/prod/v1/2019/players.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    players = JSON.parse(body).league.standard
  }
})

// request(`https://nba-players.herokuapp.com/players/curry/stephen`, function (error, response, body) {
//   if (!error) {
//    console.log(response)
//     // console.log(body)
//   }
// })

app.get('/teams/:teamName', function (request, response) {
  let teamName = request.params.teamName
  let data = players.filter(e => e.teamId == teamToIDs[teamName.toLowerCase()] && e.isActive)
  response.send(data)
})

app.post('/team', function (req, res) {
  console.log(req.body)
  teamToIDs[req.body.teamName] = req.body.teamId
  res.end()
})


app.get('/dreamTeam', function (request, response) {
  response.send(dreamTeam)
})

app.post('/roster', function (req, res) {
  if (dreamTeam.length >= 5)
    dreamTeam.splice(0,1)
  dreamTeam.push(req.body.name)
  res.end()
})

const port = 3000
app.listen(port, function () {
  console.log(`Running server on port ${port}`)
})