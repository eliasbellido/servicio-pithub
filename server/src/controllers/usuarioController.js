const jwt = require('jsonwebtoken');
const config = require('../config/config')

const controller = {}

controller.obtenerUsuarioFinal = (req, res) => {
    const { email, clave } = req.body
    req.getConnection((err, conn) => {

        conn.query('SELECT * FROM usuario WHERE email = ? AND clave = ? AND idtipo_usuario=3', [email, clave], (err, usuarios) => {
            
            if(!err){

                if (usuarios!=0) {
                    // res.status(200).json(usuarios);                          
                    var token = jwt.sign({ subid: usuarios[0].idusuario }, config.secretWord, {
                        expiresIn: '365d' // expires in 1year
                      });

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json({                        
                        "mensaje": "ok",
                        "data" : usuarios[0],
                        "token" : token
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