const multer = require("multer")
//Creo con el meto diskStorage el destino de los archivos que se suban
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const pathStorage = `${__dirname}/../public/storage`
        callback(null, pathStorage)
    },
    //Creo una funcion que separe el nombre de la extension y luego me genere un nombre random para evitar repeticion
    filename: (req, file, callback) => {
     const ext = file.originalname.split(".").pop()
     const filename = `pic_${Date.now()}.${ext}`
     callback(null, filename)
    }
    
});
const uploadPic = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      if(file.mimetype =="image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || !file) {
        callback(null, true)
      } else {
        callback(new Error("Format allowed: .jpg, .jpeg, .png"))
      }
    }
})


module.exports = uploadPic;