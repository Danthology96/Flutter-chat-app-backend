/*
    path: api/users

*/
const{Router} = require('express');
const {getUsers} = require('../controllers/usersController');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.get('/', validateJWT, getUsers);


module.exports = router;

