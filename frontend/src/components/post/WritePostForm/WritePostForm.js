import React from "react";
import "./WritePostForm.scss";

const WritePostForm = ({ data, onChange, onCancel, onSend, type }) => {
  return (
    <div className="PostForm">
      <h1>{type === "new" ? "글 작성" : "글 수정"}</h1>
      <div className="form-inputs">
        {type === "new" && (
          <>
            <input
              value={data.author}
              onChange={onChange}
              name="author"
              className="Input"
              placeholder="닉네임"
              autoComplete="off"
              maxLength="50"
            />
            <input
              value={data.password}
              onChange={onChange}
              name="password"
              className="Input"
              type="password"
              placeholder="비밀 번호"
              autoComplete="off"
              maxLength="50"
            />
            <br />
          </>
        )}
        <input
          value={data.title}
          onChange={onChange}
          name="title"
          className="Input title"
          placeholder="제목"
          autoComplete="off"
          maxLength="150"
        />
        <textarea
          value={data.content}
          onChange={onChange}
          name="content"
          className="Input content"
          placeholder="여기에 내용 입력"
        />
      </div>
      <div className="form-buttons">
        <button className="btn cancel" onClick={onCancel}>
          취소
        </button>
        <button className="btn send" onClick={onSend}>
          {type === "new" ? "작성" : "수정"}
        </button>
      </div>
    </div>
  );
};

export default WritePostForm;
