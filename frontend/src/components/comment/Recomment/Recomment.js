import React from "react";
import "./Recomment.scss";

const Recomment = ({ data, onRemove, commentId }) => {
  return (
    <>
      <li className="Recomment">
        <span className="recomment-simbol">ㄴ</span>
        <p className="recomment-author">{data.author}</p>
        <pre className="recomment-content">
          {data.content.replace(/\n$/gm, "")}
        </pre>
        <p className="recomment-created">
          {new Date(data.created).toLocaleString()}
        </p>
        <button
          onClick={() => {
            onRemove(commentId, data.id);
          }}
        >
          X
        </button>
      </li>
    </>
  );
};

export default Recomment;
