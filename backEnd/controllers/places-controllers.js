const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description:
            'One Of The Most Famous Sky Scrapers in the World!',
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: 'u1',
        address: '20 W 34th St, New York, NY 10001',
    },
];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find((p) => {
        return p.id === placeId;
    });
    if (!place) {
        throw new HttpError(
            'Could Not Find A Place For The Provided ID',
            404
        );
    }

    res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter((p) => {
        return p.creator === userId;
    });
    if (!places || places.length === 0) {
        return next(
            new HttpError(
                'Could Not Find Places For The Provided User ID',
                404
            )
        );
    }
    res.json({ places });
};
const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(
            new HttpError(
                'Invalid inputs Passed, Please Check Your Data',
                422
            )
        );
    }
    const { title, description, coordinates, address, creator } =
        req.body;
    const createPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    };
    DUMMY_PLACES.push(this.createPlace);
    res.status(201).json({ place: createPlace });
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(
            'Invalid inputs Passed, Please Check Your Data',
            422
        );
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;
    const updatePlace = {
        ...DUMMY_PLACES.find((p) => p.id === placeId),
    };
    const placeIndex = DUMMY_PLACES.findIndex(
        (p) => p.id === placeId
    );
    updatePlace.title = title;
    updatePlace.description = description;
    DUMMY_PLACES[placeIndex] = updatePlace;
    res.status(200).json({ place: updatePlace });
};
const deletePlace = (req, res, next) => {
    if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
        throw new HttpError(
            'Could Not Find A Place For That ID. ',
            404
        );
    }
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
    res.status(200).json({ message: 'Deleted Place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
