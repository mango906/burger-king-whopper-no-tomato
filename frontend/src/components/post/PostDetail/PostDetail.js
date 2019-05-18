import React from 'react';
import "./PostDetail.scss";
import FakeDetail from '../FakeDetail/FakeDetail';

const PostDetail = ({ post, loading }) => {
    if (loading) {
        return (
            <FakeDetail />
        )
    }
    return (
        <div className="PostDetail">
            <div className="post-header">
                <h1 className="post-title">{post.title}</h1>
                <p className="post-desc">{post.author} | {new Date(post.created).toLocaleString()}</p>
            </div>
            <p>{post.content}</p>
        </div>
    );
};

export default PostDetail;