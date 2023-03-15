const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, 
{
    timestamps: true, //agrega los campos createdAt y updatedAt
});

userSchema.set("toJSON", {
    transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.__v;
    delete ret.password;
    }
});

const User = mongoose.model("User", userSchema)
module.exports = User;