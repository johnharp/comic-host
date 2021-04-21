const HttpError = require('../models/http-error');
const { v4: uuidv4 }  = require('uuid');

const DUMMY_USERS = [
 {
     id: 'u1',
     name: 'Sophia',
     email: 'sophia@harper.link',
     password: 'testpass'
 }
];
const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if (!identifiedUser || identifiedUser.password != password) {
        throw new HttpError('Could not log in user', 401);
    }

    res.json({message: 'logged in'});
};

exports.login = login;