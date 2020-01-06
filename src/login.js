var mysql = require('mysql')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'loviday'
})

var app = express()

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (request, response) {
  response.sendFile(path.join('components/App.vue'))
})

app.post('/auth', function (request, response) {
  var email = request.body.email
  var pwd = request.body.pwd
  if (email && pwd) {
    connection.query('SELECT * FROM users WHERE email = ? AND pwd = ?', [email, pwd], function (sresults) {
      if (results.length > 0) {
        request.session.connected = true
        request.session.email = email
        response.redirect('components/Welcome')
      } else {
        response.send('Incorrect email and/or password')
      }
      response.end()
    })
  } else {
    response.send('Please enter email and password')
    response.end()
  }
})
