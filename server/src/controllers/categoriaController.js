const controller = {}

controller.listarCategorias = (req, res) => {
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categoria', (err, categorias) => {
            if (!err) {
              res.status(200).json(categorias);
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server'});
            }
        })
    })
}

module.exports = controller