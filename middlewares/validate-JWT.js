const jwt = require('jsonwebtoken');


const validateJWT = (req,res, next ) => {
    //leer token
    const token = req.header('x-token');
    
    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'no auth token found'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Auth token is not valid'
        });
    }
    
    
}

module.exports = {validateJWT}