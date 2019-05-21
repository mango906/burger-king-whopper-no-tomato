const router = require("express").Router();
const postCtrl = require("./post.ctrl");

router.route("/").post(postCtrl.createPost);
router.route("/:id").patch(postCtrl.updatePost);
router.route("/:id/:password").delete(postCtrl.deletePost);
router.route("/count").get(postCtrl.count);
router.route("/:page").get(postCtrl.getPosts);
router.route("/view/:id").get(postCtrl.viewPost);
router.route("/check/:id/:password").get(postCtrl.checkPassword);

module.exports = router;
