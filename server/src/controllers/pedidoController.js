const controller = {}

let sql = `CALL sp_generarpedido(?,?,?,?,?,?,?)`;

controller.generarPedidoUSP = (req, res) => {
    const { idrestaurante, idusuario, pedidototal, idtipopago, idproducto, cantidad, precio } = req.body
    req.getConnection((err, conn) => {

        conn.query(sql, [idrestaurante, idusuario, pedidototal, idtipopago, idproducto, cantidad, precio], (err, result) => {
            
            if(!err){

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify)
                res.status(200).json({                        
                    "mensaje": "ok",
                    "data" : result[0]
                  });
            } else {
              res.status(500).json({
                "mensaje" : "error",
                "data":'Error al conectarse al server -> ' + err});
            }
        })
    })
}

controller.generarPedido = (req,res) => {

    const { idrestaurante, idusuario, pedido_total, tipo_pago,direccion_entrega } = req.body


    

    req.getConnection((err,connection) => {
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query('INSERT INTO pedido (idrestaurante,idusuario,pedido_total,tipo_pago,pedido_direccionentrega) VALUES (?,?,?,?,?)',
             [idrestaurante,idusuario,pedido_total,tipo_pago,direccion_entrega], function(error, results, fields) {
              if (error) {
                return connection.rollback(function() {
                    res.status(500).json({
                        "mensaje" : "error",
                        "data":'Error en la cabecera -> ' + error});;
                });
              }

              var lastpedidoid = results.insertId;
              console.log(lastpedidoid);
              const pedido_detalle = [Array.from(req.body.pedido_detalle).map( 
                pedidodetail => [lastpedidoid, pedidodetail.idproducto, pedidodetail.cantidad])]
            

                        
              connection.query('INSERT INTO pedido_detalle (idpedido, idproducto, cantidad) VALUES ?', pedido_detalle, function (error, results, fields) {
                if (error) {
                  return connection.rollback(function() {
                    res.status(500).json({
                        "mensaje" : "error",
                        "data":'Error en el detalle -> ' + error});;
                  });
                }
                connection.commit(function(err) {
                  if (err) {
                    return connection.rollback(function() {
                        res.status(500).json({
                            "mensaje" : "error",
                            "data":'Error en el commit del detalle -> ' + err});;
                    });
                  }
                  console.log('success!');
                  res.setHeader('Content-Type', 'application/json');
                  res.status(200).json({                        
                    "mensaje": "ok",
                    "data" : results
                  });
                });
              });
            });
          });
    })
}

module.exports = controller