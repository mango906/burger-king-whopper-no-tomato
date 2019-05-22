const post = require("database/models/post");
const dropIndex = require("lib/dropIndexes");

exports.count = async (req, res) => {
  try {
    const postCount = await post.count();
    res.status(200).json({ count: postCount });
  } catch (error) {
    const result = {
      message: "서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요"
    };
    console.log(error.message);
    res.status(500).json(result);
  }
};

exports.getPosts = async (req, res) => {
  const { page } = req.params;
  try {
    const posts = await post
      .find(
        {},
        {
          __v: false,
          _id: false,
          content: false,
          password: false,
          "comments.password": false
        }
      )
      .sort({ id: -1 })
      .limit(10)
      .skip(parseInt(page - 1, 10) * 10);
    res.status(200).json({
      message: "오홍홍 좋아용",
      posts
    });
  } catch (error) {
    const result = {
      message: "서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요"
    };
    console.log(error.message);
    res.status(500).json(result);
  }
};

exports.viewPost = async (req, res) => {
  const { id } = req.params;
  try {
    const view = await post.findOne(
      { id },
      {
        __v: false,
        _id: false,
        password: false,
        "comments.password": false,
        "comments.recomments.password": false,
        "comments.recomments._id": false
      }
    );
    if (view) {
      view.comments.sort(function(a, b) {
        return a.created - b.created;
      });
      res.status(200).json({
        message: "오홍홍 조와용",
        view
      });
    } else {
      res.status(404).json({
        message: "없어용"
      });
    }
  } catch (error) {
    const result = {
      message: "서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요"
    };
    console.log(error.message);
    res.status(500).json(result);
  }
};

exports.createPost = async (req, res) => {
  const { title, content, author, password } = req.body;

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
    await post.collection
      .getIndexes()
      .then(async res => {
        console.log(res);
        await dropIndex();
      })
      .catch(e => {
        console.log(e);
        return;
      });
    const newPost = await post.create(id, author, title, content, password);
    res.status(200).json({
      message: "오홍홍 좋아용",
      post: newPost
    });
  } catch (error) {
    const result = {
      message: "서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요"
    };
    console.log(error.message);
    res.status(500).json(result);
  }
};

exports.deletePost = async (req, res) => {
  const { id, password } = req.params;
  try {
    const find = await post.findOne({ id });
    if (!find) {
      const result = {
        message: "해당 id의 글이 없습니다"
      };
      res.status(404).json(result);
      return;
    }
    if (!find.checkPassword(password)) {
      const result = {
        message: "패스워드가 틀립니다"
      };
      res.status(401).json(result);
      return;
    }
    await post.deleteOne({ id });
    res.status(200).json({
      message: "오홍홍 좋아용"
    });
  } catch (error) {
    const result = {
      message: "서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요"
    };
    console.log(error.message);
    res.status(500).json(result);
  }
};

exports.checkPassword = async (req, res) => {
  const { id, password } = req.params;
  try {
    const find = await post.findOne({ id });
    if (!find) {
      const result = {
        message: "해당 id의 글이 없습니다"
      };
      res.status(404).json(result);
      return;
    }
    if (!find.checkPassword(password)) {
      const result = {
        message: "패스워드가 틀립니다"
      };
      res.status(401).json(result);
      return;
    }
    res.status(200).json({
      message: "오홍홍 좋아용"
    });
  } catch (error) {
    const result = {
      message: "서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요"
    };
    console.log(error.message);
    res.status(500).json(result);
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { password, title, content } = req.body;
  try {
    const find = await post.findOne({ id });
    if (!find) {
      const result = {
        message: "해당 id의 글이 없습니다"
      };
      res.status(404).json(result);
      return;
    }
    if (!find.checkPassword(password)) {
      const result = {
        message: "패스워드가 틀립니다"
      };
      res.status(401).json(result);
      return;
    }
    find.title = title;
    find.content = content;
    find.save();
    res.status(200).json({
      message: "오홍홍 좋아용",
      post: find
    });
  } catch (error) {
    const result = {
      message: "서버 에러네요 괜찮아요 원숭이들이 금방 고칠거에요"
    };
    console.log(error.message);
    res.status(500).json(result);
  }
};
