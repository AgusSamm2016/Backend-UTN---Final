const router = require("express").Router()
const userController = require("./usersCt")
const validation = require("../validations/usersVd")

//Al no poner nada se entiende por /api/users. 4 Crud operations
router.get("/", userController.getUsers)
router.post("/",  validation.userValidator, userController.registerUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
router.post("/login", userController.loginUser)
//send request for password recovery.
router.get("/forgot-password", userController.ForgotPassword)
//magic link redirects us to reset form 
router.get("/reset/:token", userController.resetPassword)
//Process form.
router.post("/reset/:token", validation.resetValidator, userController.saveNewPassword)










module.exports = router