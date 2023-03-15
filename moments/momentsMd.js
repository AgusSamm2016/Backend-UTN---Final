const mongoose = require("mongoose")

const momentSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    stadium: {type: String, required: true},
    picture: {type: String, default: ""}
},
{
    timestamps: true
})

//Find with query
momentSchema.index({title : "text"})
const Moment = mongoose.model("Moment", momentSchema)
module.exports = Moment