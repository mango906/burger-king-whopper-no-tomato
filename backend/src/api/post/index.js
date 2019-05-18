const router = require('express').Router();
const postCtrl = require('./post.ctrl');

router.route('/').post(postCtrl.createPost);
router.route('/count').get(postCtrl.count);
router.route('/:page').get(postCtrl.getPosts);
router.route('/view/:id').get(postCtrl.viewPost);

module.exports = router;