var jwt = require('jsonwebtoken')
var config = require('../config/config')

exports.authWithToken = function(req, res, next) {

    var token = req.headers['x-access-token']
    if(!token){
        return res.status(403).json({mensaje:'Acceso no autorizado.'});
    }

    jwt.verify(token, config.secretWord, function(err, decoded) {
        if(err){
            return res.status(500).json({mensaje:'Token inválido o expirado'});	
        }
        next()        
    })

}
//module.exports = verifyToken