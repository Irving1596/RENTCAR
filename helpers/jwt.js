const jwt = require('jsonwebtoken');



const generarJWT = (ID, USUARIO) => {

    return new Promise((resolve, reject) => {
        const payload = {
            ID,
            USUARIO
        };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se logro generar el JWT');
            } else {
                resolve(token);
            }
        });
    });

}
const obtenerUsuario = (req) => {

    //leer token
    const token = req.header('x-token');
    try {
        const { USUARIO } = jwt.verify(token, process.env.JWT_SECRET);
        return USUARIO;
    } catch (error) {
        return res.status(401).json({
            OK: false,
            MSG: 'No se logro obtener el ROL'
        })
    }

}
module.exports = {
    generarJWT,
    obtenerUsuario
}