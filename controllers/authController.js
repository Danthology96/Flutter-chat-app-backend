const{response} = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const { generateJWT } = require('../helpers/jwt');


const createUser = async(request, res = response) => {

    const {email, password} =  request.body;

    try {
        const duplicatedEmail = await User.findOne({email});

        if(duplicatedEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists' 
            });
        }

        const user = new User(request.body);
        
        // para encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt); 


        await user.save();
        
        // para generar el JSON Web Token (JWT)
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin'
        });
    }

}

const login = async (request, res = response)=> {
    const {email, password} = request.body;

    try {
        // validate email
        const dbUser = await User.findOne({email});
        if(!dbUser) {
            return res.status(404).json({ok: false, msg: 'Email not found'});
        }
        
        // validate password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if(!validPassword){
            
            return res.status(400).json({ok: false, msg: 'Invalid credentials'});
        }

        // generar el jwt
        const token = await generateJWT(dbUser.id);


        
        res.json({
         ok: true,
         dbUser,
         token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin'
        });
    }

}


const renewAuthToken = async (request, res = response) => {

    // const uid del usuario 
    const uid = request.uid;

    try {
        
        // generar un nuevo jwt con ese uid, generateJWT, 
        // para generar el JSON Web Token (JWT)
        const token = await generateJWT(uid);
        // obtener el usuario por el uid, User.findById....
        const user = await User.findById(uid);
        
        if(!user){
            return res.status(404).json({ok: false, msg: 'User not found'});
        }

        
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin'
        });
    }

}

module.exports ={createUser, login, renewAuthToken};