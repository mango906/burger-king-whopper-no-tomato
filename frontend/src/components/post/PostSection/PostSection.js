import React from "react";
import Pagination from "react-js-pagination";
import styles from "./PostSection.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const PostSection = ({ children, postCount, onPageMove, page }) => {
  return (
    <section>
      <h1 className={cx("post-count normal")}>
        총 {postCount}개의 글이 있습니다
      </h1>
      <table className={cx("posts normal")}>
        <colgroup>
          <col style={{ width: "54px" }} />
          <col style={{ width: "175px" }} />
          <col />
          <col style={{ width: "150px" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">글 번호</th>
            <th scope="col">글쓴이</th>
            <th scope="col">제목</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        {children}
      </table>
      {postCount === 0 ? (
        <div className={cx("no-post")}>
          <h1>아직 글이 없어요!</h1>
        </div>
      ) : (
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={postCount}
          pageRangeDisplayed={5}
          onChange={page => {
            onPageMove(page);
            window.scrollTo(0, 300);
          }}
          itemClass="page-btn"
          activeClass="select"
          innerClass="Pagination"
          disabledClass="disable"
        />
      )}
    </section>
  );
};

export default PostSection;
