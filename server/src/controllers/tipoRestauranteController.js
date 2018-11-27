const controller = {}

controller.listarTipoRestaurante = (req, res) => {
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tipo_restaurante', (err, categorias) => {
            if (!err) {
              res.status(200).json({data: categorias});
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server'});
            }
        })
    })
}

module.exports = controller