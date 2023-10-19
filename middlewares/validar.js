
var { validarPassword } = require("./password"); 

function validarUsuarioYContraseña(contraseña, usuarioBD) {
    if (usuarioBD && validarPassword(contraseña, usuarioBD.salt, usuarioBD.hash)) {
        return true;
    }

    return false;
}

module.exports = {
    validarUsuarioYContraseña
};
