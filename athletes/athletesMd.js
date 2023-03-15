const mongoose = require("mongoose")
const athleteSchema = mongoose.Schema({
    fullName:  {type: String, required: true, unique: true},
    profession: {type: String, required: true},
    body: {type: String, required: true},
    personalPic: {type: String, default: "", required: true, unique: true}
},
{
    timestamps: true
}
)

//Query search
athleteSchema.index({fullName: "text"})
const Athlete = mongoose.model("Athlete", athleteSchema)
module.exports = Athlete