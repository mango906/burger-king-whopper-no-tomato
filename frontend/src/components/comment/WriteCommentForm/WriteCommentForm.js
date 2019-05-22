import React from "react";
import "./WriteCommentForm.scss";

const WriteCommentForm = ({ data, onChange, onSend, type }) => {
  return (
    <div
      className={`WriteCommentForm ${type !== "comment" && "RecommentForm"}`}
    >
      <div className="new-comment">
        <div className="new-comment-desc">
          <input
            className="Input"
            placeholder="닉네임"
            maxLength="20"
            value={data.author}
            onChange={onChange}
            name="author"
            autoComplete="off"
          />
          <input
            className="Input"
            placeholder="비밀 번호"
            type="password"
            maxLength="20"
            value={data.password}
            onChange={onChange}
            name="password"
            autoComplete="off"
          />
        </div>
        <textarea
          className="Input content"
          placeholder={`여기에 ${type === "comment" ? "댓글" : "답글"} 입력`}
          maxLength="200"
          value={data.content}
          onChange={onChange}
          name="content"
        />
        <button className="btn new-comment-btn" onClick={onSend}>
          작성
        </button>
      </div>
    </div>
  );
};

export default WriteCommentForm;
