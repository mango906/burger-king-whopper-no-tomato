import React from "react";
import "./Comment.scss";
import RecommentList from "../RecommentList";
import WriteComment from "containers/comment/WriteComment";

const Comment = ({ data, onRemove, onRemoveRecomment }) => {
  const [showRecommentForm, setShowRecommentForm] = React.useState(false);
  return (
    <li className="Comment-wrapper">
      <div
        className="Comment"
        onClick={() => {
          setShowRecommentForm(!showRecommentForm);
        }}
      >
        <p className="comment-author">{data.author}</p>
        <pre className="comment-content">
          {data.content.replace(/\n$/gm, "")}
        </pre>
        <p className="comment-created">
          {new Date(data.created).toLocaleString()}
        </p>
        <button
          onClick={() => {
            onRemove(data.id);
          }}
        >
          X
        </button>
      </div>
      <div className="recomment-wrapper">
        {data.recomments && data.recomments.length ? (
          <RecommentList
            recomments={data.recomments}
            onRemove={onRemoveRecomment}
            commentId={data.id}
          />
        ) : (
          ""
        )}
        {showRecommentForm && (
          <WriteComment type="recomment" commentId={data.id} />
        )}
      </div>
    </li>
  );
};

export default Comment;
