module.exports = (app) => {
  app.post('/registrar', (req, res) => {
    res.send({
      message: `Hola ${req.body.email}! tu usuario fue registrado!`
    })
  })
}
