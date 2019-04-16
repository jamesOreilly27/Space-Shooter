const express = require('express')
const app = express()
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const PORT = process.env.PORT || 9433
const https = require('https')
const fs = require('fs')
const dir = require('os').homedir()

const options = {
  key: fs.readFileSync( `${dir}/ssl/localhost/localhost.key` ),
  cert: fs.readFileSync( `${dir}/ssl/localhost/localhost.crt` ),
  requestCert: false,
  rejectUnauthorized: false
}

const server = https.createServer(options, app)

app.use(volleyball)
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '..', '/public')))
app.use('./static', express.static(path.join(__dirname, 'public')))

app.get('*', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')))

server.listen(PORT, () => console.log(chalk.blue.bgWhite.bold(`We'll Do It Live on Port ${server.address().port}`)))

// server.listen(PORT, () => console.log(chalk.blue.bgWhite.bold(server.address().port)))