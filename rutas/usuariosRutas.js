var ruta = require("express").Router();
var { validarUsuarioYContraseña } = require("../middlewares/validar");
var subirArchivo = require("../middlewares/middlewares").subirArchivo;
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario} = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    var users = await mostrarUsuarios();
    console.log(users);
    res.render("usuarios/mostrar", {users});
})
ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/nuevousuario",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    //res.end();
    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});

ruta.get("/iniciarSesion", (req, res) => {
    res.render("usuarios/login");
});

ruta.get("/editarUsuario/:id", async (req, res) => {
    const usuario = await buscarPorId(req.params.id);
    //console.log(req.params.id);
    //console.log(user);
    //res.end();
    res.render('usuarios/modificar', {usuario});
  });
  
  ruta.post("/editarUsuario",subirArchivo(),async(req,res)=>{
    //console.log("req.body");
    if(req.file!=undefined){
        req.body.foto = req.file.originalname;
    }

    else{
        req.body.foto = req.body.fotoVieja;
    }
    var usuario=await modificarUsuario(req.body);
    console.log("usuarioy");
    res.redirect("/");
 });

ruta.get("/borrarUsuario/:id", async (req,res)=>{
   await borrarUsuario(req.params.id);
   res.redirect("/");
})

ruta.post("/iniciarSesion", async (req, res) => {
    var usuario = req.body.usuario;
    var contraseña = req.body.password;

    // Debes obtener el usuario de tu base de datos
    // Puedes hacerlo usando buscarPorId u otra función de tu código

    var usuarioBD = await buscarPorId(usuario); // Aquí asumo que buscarPorId toma un nombre de usuario como parámetro

    if (validarUsuarioYContraseña(usuario, contraseña, usuarioBD)) {
        // Usuario y contraseña válidos
        res.redirect("/bienvenido"); // Cambia "/bienvenido" a la ruta que deseas redirigir después de iniciar sesión
    } else {
        // Usuario o contraseña incorrectos
        res.send("Usuario o contraseña incorrectos"); // Puedes redirigir o mostrar un mensaje de error
    }
});

module.exports = ruta;