const {check, validationResult} = require("express-validator")

const userValidator = [
    check("fullName")
    .trim()
    .notEmpty().withMessage("Field can not be empty")
    .isAlpha("es-ES", {ignore: " "}).withMessage("Only letters")
    .isLength({min: 5, max: 90}).withMessage("Count must be between 5 & 90 characters"),
    check("userName")
    .trim()
    .notEmpty().withMessage("Field can not be empty"),
    check("email")
    .trim()
    .notEmpty().withMessage("Field can not be empty")
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),
    check("password")
    .trim()
    .notEmpty().withMessage("Field can not be empty")
    .isLength({min: 8, max: 16}).withMessage("Character count: min 8, max 16"),
    (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json(errors)
        } else {
            return next()
        }
    }
]


const resetValidator = [
    check("password_1")
      .exists()
      .isLength({ min: 8, max: 16 })
      .withMessage("Between 8 and 16 characters")
      .trim(),
    check("password_2").custom(async (password_2, { req }) => {
      if (req.body.password_1 !== password_2) {
        throw new Error("Passwords must be identical");
      }
    }),
    (req, res, next) => {
      const token = req.params.token;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const arrWarnings = errors.array();
        res.render("reset", { arrWarnings, token });
      } else {
        return next();
      }
    },
  ];
module.exports = {userValidator, resetValidator}