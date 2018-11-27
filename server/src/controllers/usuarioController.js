const controller = {}

controller.obtenerUsuarioFinal = (req, res) => {
    const { email, clave } = req.body
    req.getConnection((err, conn) => {

        conn.query('SELECT * FROM usuario WHERE email = ? AND clave = ? AND idtipo_usuario=3', [email, clave], (err, usuarios) => {
            
            if(!err){

                if (usuarios!=0) {
                    // res.status(200).json(usuarios);                    
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json({                        
                        "mensaje": "ok",
                        "data" : usuarios[0]
                      });
                   
                  }else{
                    res.status(200).json({mensaje:'Credenciales incorrectas -> ' + err});
                  } 
            } else {
              res.status(500).json({mensaje:'Error al conectarse al server -> ' + err});
            }
        })
    })
}

module.exports = controller