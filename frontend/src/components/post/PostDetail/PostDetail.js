import React from 'react';
import "./PostDetail.scss";
import FakeDetail from '../FakeDetail/FakeDetail';
import { withRouter } from 'react-router-dom';

const PostDetail = ({ post, loading, history, onRemove }) => {
    if (loading) {
        return (
            <FakeDetail />
        )
    }
    return (
        <div className="PostDetail">
            <div className="post-header">
                <h1 className="post-title">{post.title}</h1>
                <div className="post-desc">
                    <p>{post.author} | {new Date(post.created).toLocaleString()}</p>
                    <div className="post-buttons">
                        <button>수정</button>
                        <button onClick={() => {onRemove()}}>삭제</button>
                        <button onClick={() => { history.push("/") }}>목록으로</button>
                    </div>
                </div>
            </div>
            <pre>{post.content}</pre>
        </div>
    );
};

export default withRouter(PostDetail);