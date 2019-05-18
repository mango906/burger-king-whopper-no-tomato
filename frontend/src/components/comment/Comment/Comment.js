import React from 'react';
import "./Comment.scss";

const Comment = ({ data }) => {
    return (
        <li className="Comment">
            <p className="comment-author">{data.author}</p>
            <p className="comment-content">{data.content}</p>
            <p className="comment-created">{new Date(data.created).toLocaleString()}</p>
            <button>X</button>
        </li>
    );
};

export default Comment;