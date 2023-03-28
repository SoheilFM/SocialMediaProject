const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Place = require('../models/place');
// Get a place by its ID
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
// Get all places created by a user
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
// Create a new place
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
// Update an existing place
const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(
            'Invalid inputs Passed, Please Check Your Data',
            422
        );
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something Went Wrong, Could Not Update Place.',
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
    place.title = title;
    place.description = description;
    try {
        await place.save();
    } catch (err) {
        const error = new HttpError(
            'Somthing Went Wrong, Could Not Update Place.',
            500
        );
        return next(error);
    }
    res.status(200).json({
        place: place.toObject({ getters: true }),
    });
};
// Deleting an existing place
const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
        );
        return next(error);
    }

    try {
        await place.remove();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
