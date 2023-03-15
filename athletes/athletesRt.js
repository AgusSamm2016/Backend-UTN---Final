const router = require("express").Router()
const athletesController = require("./athletesCt")
const isAuthorized = require("../validations/sessionVd")
const uploadPic = require("../handlers/handleStorage")

router.get("/", athletesController.getAthletes)
router.post("/", uploadPic.single("personalPic"), isAuthorized, athletesController.postAthletes)
router.post("/find/:query", athletesController.findAthlete)
router.delete("/:id", athletesController.deleteAthletes)
router.put("/:id", athletesController.updateAthlete)


module.exports = router