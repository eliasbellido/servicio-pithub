const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const emyconnection = require('express-myconnection')
const mysql = require('mysql')

const app = express()

const restaurantRoutes = require('./routes/restaurant')

app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(emyconnection(mysql, {
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  ssl: true
}, 'single'))

app.use(cors())

app.use('/api/rest', restaurantRoutes)
// require('./routes')(app)

app.listen(config.port, err => {
  if (!err) {
    console.log(`Server iniciado en el puerto ${config.port}`)
    console.log(`bd server connection with credentials -> ${config.host}, ${config.user}, ${config.database}, ${config.password}`)
  } else {
    console.log('Error en conectar al puerto')
  }
})

// app.listen(config.port)
// console.log(`Server iniciado en el puerto ${config.port}`)
