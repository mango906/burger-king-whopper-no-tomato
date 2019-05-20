const post = require('database/models/post');

exports.createComment = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        author,
        password,
        content
    } = req.body
    try {
        const find = await post.findOne({ id });
        if (!find) {
            res.status(404).json({
                message: '글이 없어요',
            });
            return;
        }
        const { comments } = find;
        let idx = comments.length ? comments[0].id + 1 : 1;
        const resultPassword = await post.cryptoPassword(password);
        const newComment = {
            id: idx,
            author,
            content,
            created: new Date(),
            password: resultPassword
        };
        find.comments.unshift(newComment);
        find.save();
        res.status(200).json({
            message: '오홍홍 좋아용',
            comment: newComment,
        });
    } catch (error) {
        const result = {
            message: '서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요',
        };
        console.log(error.message);
        res.status(500).json(result);
    }
}

exports.deleteComment = async (req, res) => {
    const {
        postId,
        commentId,
        password
    } = req.params;
    try{
        const find = await post.findOne({ id: postId });
        if(!find){
            res.status(404).json({
                message: '글이 없어요',
            });
            return;
        }
        const findComment = find.comments.find(comment => comment.id === parseInt(commentId));
        if(!findComment){
            res.status(404).json({
                message: '댓글이 없어요',
            });
            return;
        }
        if(post.cryptoPassword(password) !== findComment.password){
            res.status(401).json({
                message: '비밀 번호가 틀렸어요',
            })
            return;
        }
        find.comments = find.comments.filter(comment => comment.id !== parseInt(commentId));
        find.save();
        res.status(200).json({
            message: '오홍홍 좋아용'
        });
    } catch (error) {
        const result = {
            message: '서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요',
        };
        console.log(error.message);
        res.status(500).json(result);
    }
}