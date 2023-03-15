//Requerimientos:
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require("multer")
//Archivos mongo
require("dotenv").config()
require("./mongo/mongo")

//Configuracion express:
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3030

//Configuration HBS
const path = require("path")
const handlebars = require("express-handlebars")
//Definimos carpeta de archivos estaticos y parser
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//----------RUTAS----------//

app.use("/api/users", require("./users/usersRt"))
app.use("/api/athletes", require("./athletes/athletesRt"))
app.use("/api/moments", require("./moments/momentsRt"))

//Bootstrap:
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));


//Configuracion handlebars:
//hbs settings:
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: path.join( __dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    errHelper: function (arrWarnings, inputName) {
      if (!arrWarnings) return null;
      const warning = arrWarnings.find((item) => item.param === inputName);
      if (warning == undefined) {
        return null;
      } else {
        return `
       <div class="alert alert-danger mt-1" role="alert">
       ${warning.msg}
       <button type="button" class="btn-close"
       data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`;
      }
    },
  }

})

app.set("views", "./views");
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

//app handler:
app.listen(PORT, (err) => {
    !err? console.log(`Server is currently running at http://localhost:${PORT}`) : console.log(`Server is not running due to: ${err}`);
})

//error handlers: 404 & General.
app.use((req, res, next) => {
    let error = new Error();
    error.message = "Resource not found";
    error.status = 404;
    next(error);
})
    
app.use((error, req, res, next) => {
        if(!error.status) error.status = 400;
        res.status(error.status).json({status: error.status, message: error.message})
})
    