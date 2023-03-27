const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Soheil',
        email: 'test@test@test.com',
        password: 'test11',
    },
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(
            'Invalid inputs Passed, Please Check Your Data',
            422
        );
    }
    const { name, email, password } = req.body;
    const hasUser = DUMMY_USERS.find((u) => u.email === email);
    if (hasUser) {
        throw new HttpError(
            'Could Not create User Already Exist. ',
            422
        );
    }
    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password,
    };
    DUMMY_USERS.push(createdUser);
    res.status(201).json({ user: createdUser });
};
const login = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError(
            'Could Not Identify User, Credentials seem be wrong. ',
            401
        );
    }
    res.json({ message: 'LOGGED IN' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
