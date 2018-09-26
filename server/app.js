const express = require('express')
const app = express()
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const PORT = 9433

app.use(volleyball)
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('./static', express.static(path.join(__dirname, 'public')))

app.use('*', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')))

app.listen(PORT, () => console.log(chalk.blue.bgWhite.bold(`We'll Do It Live on Port ${PORT}`)))
