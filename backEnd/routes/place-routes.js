const express = require('express');

const router = express.Router();

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
        const error = new Error(
            'Could Not Find A Place For The Provided ID'
        );
        error.code = 404;
        throw error;
    }
    res.json({ place });
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find((p) => {
        return p.creator === userId;
    });
    if (!place) {
        const error = new Error(
            'Could Not Find A Place For The Provided User ID'
        );
        error.code = 404;
        return next(error);
    }
    res.json({ place });
});

module.exports = router;
