const {VerifyToken} = require("../handlers/handleJWT")

const isAuthorized = async (req, res, next) => {
let error = new Error("Forbidden access | Invalid Token")
//Consulto si existe el header de authorization
if(!req.headers.authorization) {
    let error = new Error("Token has not been provided");
    error.status = 403;
    return next(error)
};
//Separo el token de bearer y verifico el token
const token = req.headers.authorization.split(" ").pop();
const verifiedToken = await VerifyToken(token);
if (verifiedToken instanceof Error) {
  error.status = 401;
  error.message = "Token is not valid"
  return next(error)
} next()
}

module.exports = isAuthorized