const {response} = require('express');
const  User = require('../models/userModel');

const getUsers = async (request, res = 'response') => {

    const from = Number(request.query.from) || 0;


    /// retorna todos los ids menos el id encontrado en la request.id
    const users = await User
                            .find({_id: {$ne: request.uid}})
                            .sort('-online')
                            .skip(from)
                            .limit(20);

    res.json({ok: true, users});
}


module.exports = {getUsers};