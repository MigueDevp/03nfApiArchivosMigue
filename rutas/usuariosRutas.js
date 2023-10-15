var ruta = require("express").Router();
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
    //console.log(req.file.originalname);
    req.body.foto=req.file.originalname;
    //res.end();
    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});
ruta.get("/editarUsuario/:id", async (req, res) => {
    const usuario = await buscarPorId(req.params.id);
    //console.log(req.params.id);
    //console.log(user);
    //res.end();
    res.render('usuarios/modificar', {usuario});
  });
  ruta.post("/editarUsuario",async(req,res)=>{
    var user1=await modificarUsuario(req.body);
    console.log("user1");
    res.redirect("/");
 });

ruta.get("/borrarUsuario/:id", async (req,res)=>{
   await borrarUsuario(req.params.id);
   res.redirect("/");
})

module.exports = ruta;