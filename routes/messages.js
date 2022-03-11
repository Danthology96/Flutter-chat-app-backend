/*
    Path: /api/messages
*/

const{Router} = require('express');
const { getChat } = require('../controllers/messagesController');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.get('/:from', validateJWT, getChat);


module.exports = router;
