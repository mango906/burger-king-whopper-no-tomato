const router = require('express').Router();
const commentCtrl = require('./comment.ctrl');

router.route('/:id').post(commentCtrl.createComment);

module.exports = router;