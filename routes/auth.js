/*
    path: api/login

*/
const { check } = require('express-validator');

const{Router} = require('express');
const { createUser, login, renewAuthToken } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');

const router = Router();

router.post('/new', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty(),
    check('email','Email does not have the correct format').isEmail(),
    validateFields
] , createUser);

// post: /
// validar email y password
router.post('/',[
    check('email', 'email is required').not().isEmpty(),
    check('email','Email does not have the correct format').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
], login);


router.get('/renew', validateJWT, renewAuthToken);


module.exports = router;

