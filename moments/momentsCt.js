const Moment = require("./momentsMd")
const public_url = process.env.public_url

const getMoments = (req, res, next) => {
    Moment.find()
    .then((data) => {
    !data.length? next() : res.status(200).json(data);})
    .catch((error) => {
        error.status = 500;
        next(error);
    })
}

const postMoments = async(req, res, next) => {
let pic = "";
if(req.file) {
    pic = `${public_url}/storage/${req.file.picture}`
}
    const newMoment = new Moment({...req.body, picture: pic})
    newMoment.save()
    .then((result) => {console.log(result); res.status(200).json({message: "The new moment has been posted"})})
    .catch((error) => {
      next(error)
    })   
}

const findMoment = async(req, res, next) => {
    Moment.find({$text: { $search: req.params.query }}) 
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
        return next()
    })   
}

const deleteMoments = async(req, res, next) => {
try {
  const deletedMoment = await Moment.findByIdAndDelete(req.params.id)
    res.status(200).json({ moment: deletedMoment.title, message: "The moment has been deleted"})
} catch (error) {
    next()
}}

const updateMoment = async (req, res, next) => {
    try {
     const updatedMoment = await Moment.findByIdAndUpdate(req.params.id, req.body, {new: true})
     res.status(200).json({message: "Moment has been updated", moment: updatedMoment})
    } catch (error) {
     next()
    }
}


module.exports = {getMoments, postMoments, findMoment, deleteMoments, updateMoment}