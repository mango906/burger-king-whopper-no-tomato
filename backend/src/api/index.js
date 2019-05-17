const router = require('express').Router();
const post = require('./post');
const comment = require('./comment');

router.use('/post', post);
router.use('/comment', comment);

module.exports = router;