import React from 'react';
import "./Comment.scss";

const Comment = ({ data, onRemove }) => {
    return (
        <li className="Comment">
            <p className="comment-author">{data.author}</p>
            <pre className="comment-content">{data.content.replace(/\n$/gm, '')}</pre>
            <p className="comment-created">{new Date(data.created).toLocaleString()}</p>
            <button onClick={()=>{onRemove(data.id)}}>X</button>
        </li>
    );
};

export default Comment;