const express = require('express');

const router = express.Router();
const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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

router.get('/:pid', (req, res, next) => {
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
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find((p) => {
        return p.creator === userId;
    });
    if (!place) {
        return next(
            new HttpError(
                'Could Not Find A Place For The Provided User ID',
                404
            )
        );
    }
    res.json({ place });
});

module.exports = router;
