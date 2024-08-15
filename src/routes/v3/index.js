const express = require('express');
const { find, create, getAll, destroy, update } = require('../../controllers/event-controller');

const router = express.Router(); 

router.get('/:event_id', find);

router.get('/events/:events', getAll);

router.post('/events', create);

router.put('/events/:id', update);

router.delete('/events/:id', destroy);

module.exports = router;