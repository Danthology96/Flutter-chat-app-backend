
const { validationResult } = require("express-validator");

// next es un callback que indica a express que si todo sale bien
// puede continuar con el siguiente middleware
const validateFields = (request, res, next) => {
        
    const errors = validationResult(request);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    };
    next();
}

module.exports = {
    validateFields
}