const Athlete = require("./athletesMd")
const public_url = process.env.public_url

const getAthletes = (req, res, next) => {
    Athlete.find()
    .then((data) => {
    !data.length? next() : res.status(200).json(data);})
    .catch((error) => {
        error.status = 500;
        next(error);
    })
}

const postAthletes = async(req, res, next) => {
let pic = "";
if(req.file) {
    pic = `${public_url}/storage/${req.file.personalPic}`
}
    const newAthlete = new Athlete({...req.body, personalPic: pic})
    newAthlete.save()
    .then((result) => {console.log(result); res.status(200).json({message: "The athlete has been added"})})
    .catch((error) => {
      next(error)
    })   
}

const findAthlete = async(req, res, next) => {
    Athlete.find({$text: { $search: req.params.query }}) 
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
        return next()
    })   
}

const deleteAthletes = async(req, res, next) => {
try {
  const deletedAthlete = await Athlete.findByIdAndDelete(req.params.id)
    res.status(200).json({ athlete : deletedAthlete.fullName, message: "The athlete has been deleted"})
} catch (error) {
    next()
}}

const updateAthlete= async (req, res, next) => {
    try {
     const updatedAthlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, {new: true})
     res.status(200).json({message: "The information of the athlete has been updated", athlete: updatedAthlete})
    } catch (error) {
     next()
    }
}


module.exports = {getAthletes, postAthletes, updateAthlete, findAthlete, deleteAthletes}