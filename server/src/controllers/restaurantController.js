const controller = {}

controller.listarRestaurantes = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM restaurante where vigente = 1', (err, restaurantes) => {
            if (!err) {
              res.status(200).json({data:restaurantes});
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server'});
            }
        })
    })
}

controller.obtenerRestaurantesxCategoria = (req, res) => {
    const { id } = req.params
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM restaurante t1 INNER JOIN distrito t2 ON t1.iddistrito = t2.iddistrito WHERE t1.idtipo_restaurante = ? and t1.vigente = 1', [id], (err, rows) => {
            if (!err) {
              res.status(200).json({data:rows});
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server'});
            }
        })
    })
}

controller.obtenerRestaurante = (req, res) => {
    const { id } = req.params
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM restaurante WHERE idrestaurante = ?', [id], (err, rows) => {
            if (!err) {
              res.status(200).json(rows);
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server'});
            }
        })
    })
}

module.exports = controller