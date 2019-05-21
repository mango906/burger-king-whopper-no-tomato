const router = require("express").Router();
const commentCtrl = require("./comment.ctrl");

router.route("/:id").post(commentCtrl.createComment);
router.route("/:postId/:commentId/:password").delete(commentCtrl.deleteComment);
router.route("/:postId/:commentId").post(commentCtrl.createRecomment);

module.exports = router;
