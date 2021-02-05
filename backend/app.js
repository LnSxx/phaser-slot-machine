const express = require('express')
const app = express()
const cors = require('cors')
const LISTEN_PORT = require('./settings')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Web server for static files')
})

app.use(express.static('public'));

app.listen(LISTEN_PORT, () => {
    console.log(`Example app listening at http://localhost:${LISTEN_PORT}`)
  })
