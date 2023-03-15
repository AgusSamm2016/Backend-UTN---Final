const jsonwebtoken = require("jsonwebtoken")
const jwt_secret = process.env.jwt_secret 

const SignToken = async(user, time) => {
    const sign = jsonwebtoken.sign(user, jwt_secret, {expiresIn: time})
    return sign;
}

const VerifyToken = async (token) => {
try {
    return jsonwebtoken.verify(token, jwt_secret)
} catch (error) {
    return error
}
}

module.exports = {SignToken, VerifyToken}