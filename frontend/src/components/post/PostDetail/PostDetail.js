import React from "react";
import "./PostDetail.scss";
import FakeDetail from "../FakeDetail/FakeDetail";
import { Link } from "react-router-dom";

const PostDetail = ({ post, loading, onRemove }) => {
  if (loading) {
    return <FakeDetail />;
  }
  return (
    <div className="PostDetail">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-desc">
          <p>
            {post.author} | {new Date(post.created).toLocaleString()}
          </p>
          <div className="post-buttons">
            <Link to={`/edit/${post.id}`}>
              <button className="btn edit">수정</button>
            </Link>
            <button onClick={onRemove} className="btn remove">
              삭제
            </button>
            <Link to="/">
              <button className="btn list">목록으로</button>
            </Link>
          </div>
        </div>
      </div>
      <pre>{post.content}</pre>
    </div>
  );
};

export default PostDetail;
