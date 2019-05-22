import React from "react";
import Comment from "../Comment/Comment";
import "./CommentList.scss";

const CommentList = ({ comments, onRemove, onRemoveRecomment }) => {
  return (
    <ul className="CommentList">
      <h1 className="comment-count">
        댓글 목록 (총 {comments.length}개의 댓글)
      </h1>
      {comments.map(e => {
        return (
          <Comment
            data={e}
            key={e.id}
            commentId={e.id}
            onRemove={onRemove}
            onRemoveRecomment={onRemoveRecomment}
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
