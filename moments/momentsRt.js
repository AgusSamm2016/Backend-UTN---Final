const router = require("express").Router()
const momentController = require("./momentsCt")
const isAuthorized = require("../validations/sessionVd")
const uploadPic = require("../handlers/handleStorage")

router.get("/", momentController.getMoments)
router.post("/", uploadPic.single("picture"), isAuthorized, momentController.postMoments)
router.post("/find/:query", momentController.findMoment)
router.delete("/:id", momentController.deleteMoments)
router.put("/:id", momentController.updateMoment)


module.exports = router