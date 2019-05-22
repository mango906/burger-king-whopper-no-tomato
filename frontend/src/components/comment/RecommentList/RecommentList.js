import React from "react";
import "./RecommentList.scss";
import Recomment from "../Recomment/Recomment";

const RecommentList = ({ recomments, onRemove, commentId }) => {
  return (
    <ul className="RecommentList">
      {recomments.map(e => {
        return (
          <Recomment
            data={e}
            key={e.id}
            onRemove={onRemove}
            commentId={commentId}
          />
        );
      })}
    </ul>
  );
};

export default RecommentList;
