import React from 'react';
import Comment from '../Comment/Comment';
import "./CommentList.scss";

const CommentList = ({ comments }) => {
    return (
        <ul className="CommentList">
            <h1 className="comment-count">댓글 목록 (총 {comments.length}개의 댓글)</h1>
            {
                comments.map(e => {
                    console.log(e);
                    return <Comment data={e} key={e.id} />
                })
            }
        </ul>
    );
};

export default CommentList;