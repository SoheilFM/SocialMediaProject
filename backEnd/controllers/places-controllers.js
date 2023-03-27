const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Place = require('../models/place');

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

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went Wrong, Could Not Find a Place',
            500
        );
        return next(error);
    }
    if (!place) {
        const error = new HttpError(
            'Could Not Find A Place For The Provided ID',
            404
        );
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        const error = new HttpError('Fetching Places Failed', 500);
        return next(error);
    }
    if (!places || places.length === 0) {
        return next(
            new HttpError(
                'Could Not Find Places For The Provided User ID',
                404
            )
        );
    }
    res.json({
        places: places.map((place) =>
            place.toObject({ getters: true })
        ),
    });
};
const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError(
                'Invalid inputs Passed, Please Check Your Data',
                422
            )
        );
    }
    const { title, description, coordinates, address, creator } =
        req.body;
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510',
        creator,
    });
    try {
        await createdPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Creating Place Failed, Please Try Again',
            500
        );
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
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
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
        throw new HttpError(
            'Could Not Find A Place For That ID. ',
            404
        );
    }
    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
    res.status(200).json({ message: 'Deleted Place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
