const { v4: uuidv4 }  = require('uuid');

const HttpError = require('../models/http-error');
const User = require('../models/user');


const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser

    try {
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError(
            'Failed to log in.  Please try again.',
            500
        );
        return next(error);
    }

    if (!existingUser || existingUser.password != password) {
        const error = new HttpError(
            'Failed to log in.  Please try again.',
            401
        );
        return next(error);
    }

    res.json({message: 'logged in'});
};

exports.login = login;