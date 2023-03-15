//Requerimientos. Modelo, metodos bcrypt, url 
const User = require("./usersMd")
const bcrypt = require("../handlers/handlePassword")
const public_url = process.env.public_url
const jsonwebtoken = require("../handlers/handleJWT")
const { json } = require("express")
const transport = require("../handlers/handleNodemailer")
const JSONTransport = require("nodemailer/lib/json-transport")


const getUsers = (req, res, next) => {   
User.find().then((data) => {
!data.length? next() : res.status(200).json(data);
 }).catch((error) => {
        error.status = 500;
        next(error);
})}

const registerUser = async (req, res, next) => {
const encriptedPassword = await bcrypt.hashPassword(req.body.password)
//req.body es el cuerpo de la peticion y normalmente vendria en un formulario con un submit desde el front.
const newUser = new User({...req.body, password: encriptedPassword})
newUser.save().then((result) => {console.log(result); res.status(200).json(newUser)})
.catch((error) => {
    error.status = 400;
    next(error)
})};


const updateUser = async (req, res, next) => {
        try {
        //Para que me muestre el dato que cambie debo pasarle todos los parametros y ademas pasarle {new: true}
         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
         res.status(200).json({message: "User has been updated", user: updatedUser})
        } catch (error) {
         next()
        }
    }

const deleteUser = async (req, res, next) => {
    try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ user: deletedUser.id, message: "The user has been deleted"})
    } catch (error) {
    next()
    }
}

const loginUser = async (req, res, next) => {
let error = new Error( "User or password is incorrect")
//Esto me devolvera un array con la data del usuario.
const user = await User.find().where({email: req.body.email})
console.log(user);
if(!user.length) {
    error.status = 401
    return next(error)
} 
const encriptedPassword = user[0].password;
const matching = await bcrypt.checkPassword(req.body.password, encriptedPassword)
if(!matching) {
    error.status = 401
    return next(error)
}
//Creamos un usuario con los datos que me trae el array para el sign token
const tokenUser = {
    fullName: user[0].fullName,
    userName: user[0].userName,
    email: user[0].email
}
const accessToken = await jsonwebtoken.SignToken(tokenUser, "24h")
res.status(200).json({message: "Access has been granted", token: accessToken, userData: tokenUser})
}

const ForgotPassword =  async(req, res, next) => {
    let error = new Error ("No user with that email has been found")
    //¿existe el mail?
    const user = await User.find().where({email: req.body.email})
    if(!user.length) {
        error.status = 404
        return next(error)
    }
    //si existe le mando el token de seguridad y el link de restauracion o recuperacion.
    const tokenUser = {
        id: user[0].id,
        fullName: user[0].fullName,
        email: user[0].email
    }
    const token = await jsonwebtoken.SignToken(tokenUser, "15m")
    const link = `${process.env.public_url}/api/users/reset/${token}`
    //Creamos el cuerpo del mail y se lo enviamos al usuario.
    const mailDetails = {
        from: "Tech-Support@mydomain.com",
        to: tokenUser.email,
        subject: "Password recovery",
        html: `<h2>Password recovery service</h2>
        <h3>Hello ${tokenUser.fullName}</h3>
        <p>To reset your password, please click the link and follow<p>
        <a href="${link}">Click to reset</a>`
    }
    transport.transport.sendMail(mailDetails, (error, data) => {
    if(error) {
        return next(error)
    } else {
        res.status(200).json({message: `Hola ${tokenUser.fullName}, we have sent you an email with instructions to ${tokenUser.email}`})
    }
    })}
    
    //Reset
    
    const resetPassword = async (req, res, next) => {
        const {token} = req.params;
        const tokenStatus = await jsonwebtoken.VerifyToken(token);
        if (tokenStatus instanceof Error) {
          return next(tokenStatus);
        }
        res.render("reset", { token, tokenStatus });
      };
    
    
      const saveNewPassword = async (req, res, next) => {
        const {token} = req.params;
        const tokenStatus = await jsonwebtoken.VerifyToken(token);
        if (tokenStatus instanceof Error) return next(tokenStatus);
        const newPassword = await bcrypt.hashPassword(req.body.password_1);
        try {
          const updatedUser = await User.findByIdAndUpdate(tokenStatus.id, {
            password: newPassword,
          });
          res
            .status(200)
            .json({ message: `Password has been changed for user ${tokenStatus.fullName}` });
        } catch (error) {
          next(error);
    }
};


module.exports = {getUsers, updateUser, deleteUser, registerUser, loginUser, ForgotPassword, resetPassword, saveNewPassword}