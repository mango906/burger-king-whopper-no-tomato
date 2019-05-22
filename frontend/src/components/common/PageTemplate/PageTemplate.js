import React from "react";
import styles from "./PageTemplate.scss";
import classNames from "classnames/bind";
import { Link, withRouter } from "react-router-dom";

const cx = classNames.bind(styles);

const PageTemplate = ({ children, location }) => {
  return (
    <div className={cx("post-template")}>
      <header>
        <h1 className={cx("header-title light")}>
          <Link to="/">
            버거킹 와퍼에
            <br />
            토마토 빼고 주세요
          </Link>
        </h1>
      </header>
      {children}
      <footer>
        <div className="buttons">
          {location.pathname !== "/" && (
            <Link to="/" className={cx("btn list")}>
              목록으로
            </Link>
          )}
          {location.pathname !== "/write" && (
            <Link to="/write" className={cx("btn new-post")}>
              글 쓰기
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default withRouter(PageTemplate);
