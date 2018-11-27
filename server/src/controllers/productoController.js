const controller = {}

controller.listarProductos = (req, res) => {
    const { id } = req.params
    req.getConnection((err, conn) => {
        conn.query('SELECT t3.nomrestaurante, t4.tipo_restaurante, t3.logorestaurante, t1.id, t1.nomproducto,t2.nomcategoria, t1.calorias, t1.precio, t1.imagenproducto '+
        'FROM restaurante_producto t1 '+
        'INNER JOIN categoria t2 ' +
         'on t1.idcategoria = t2.idcategoria '+
          'INNER JOIN restaurante t3 '+
          'on t1.idrestaurante = t3.idrestaurante '+
          'INNER JOIN tipo_restaurante t4 ' +
           'on t4.idtipo_restaurante = t3.idtipo_restaurante WHERE t1.idrestaurante = ?', [id], (err, productos) => {
            if (!err) {
              // res.status(200).json(productos);
              res.setHeader('Content-Type', 'application/json');
              res.status(200).json({ "data": productos});
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server->'+err});
            }
        })
    })
}

controller.obtenerProducto = (req, res) => {
    const { id } = req.params
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM restaurante_producto WHERE id = ?', [id], (err, rows) => {
            if (!err) {
              res.status(200).json(rows);
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server'});
            }
        })
    })
}

module.exports = controller