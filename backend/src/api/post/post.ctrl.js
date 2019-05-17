const post = require('database/models/post');

exports.getPosts = async (req, res) => {
    const {
        page,
    } = req.params;
    try {
        const posts = await post.find({},
            { '__v': false, '_id': false, 'content': false, 'password': false, 'comments.password': false })
            .sort({ idx: -1 })
            .limit(50)
            .skip(parseInt(page - 1, 10) * 5);
        if (posts.length) {
            res.status(200).json({
                message: '오홍홍 좋아용',
                posts,
            });
        } else {
            res.status(404).json({
                message: '글이 없어요',
            });
        }
    } catch (error) {
        const result = {
            message: '서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요',
        };
        console.log(error.message);
        res.status(500).json(result);
    }
};

exports.viewPost = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const view = await post.findOne({ id }, { '__v': false, '_id': false, 'password': false, 'comments.password': false });
        if (view) {
            res.status(200).json({
                message: '오홍홍 조와용',
                view
            })
        } else {
            res.status(404).json({
                message: '없어용',
            })
        }
    } catch (error) {
        const result = {
            message: '서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요',
        };
        console.log(error.message);
        res.status(500).json(result);
    }
};

exports.createPost = async (req, res) => {
    const {
        title,
        content,
        author,
        password,
    } = req.body;

    try {
        let id;
        const lastPost = await post
            .findOne()
            .sort({ created: -1 })
            .limit(1);
        if (lastPost === null) {
            id = 1;
        } else {
            console.log(lastPost);
            id = lastPost.id + 1;
        }
        const newPost = await post.create(id, author, title, content, password);
        res.status(200).json({
            message: '오홍홍 좋아용',
            post: newPost,
        })
    } catch (error) {
        const result = {
            message: '서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요',
        };
        console.log(error.message);
        res.status(500).json(result);
    }
};
