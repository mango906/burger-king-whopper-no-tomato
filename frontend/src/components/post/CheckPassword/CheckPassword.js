import React from "react";
import "./CheckPassword.scss";

const CheckPassword = ({ onChange, onCheck, onCancel, value }) => {
  return (
    <div className="CheckPassword">
      <div className="check-form">
        <p>비밀번호를 입력하세요</p>
        <input
          className="form-input"
          type="password"
          autoComplete="off"
          onChange={onChange}
          name="password"
          value={value}
        />
        <div className="form-buttons">
          <button className="cancel" onClick={onCancel}>
            취소
          </button>
          <button className="check" onClick={onCheck}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckPassword;
