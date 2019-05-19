import React from 'react';
import styles from './PostSection.scss';
import classNames from 'classnames/bind';
import createArray from 'lib/createArray';

const cx = classNames.bind(styles);

const PostSection = ({ children, postCount, onPageMove }) => {
  const pageCount = postCount ? Math.ceil(postCount / 10) : 1;
  return (
    <section>
      <h1 className={cx('post-count normal')}>총 {postCount}개의 글이 있습니다</h1>
      <table className={cx('posts normal')}>
        <colgroup>
          <col style={{ width: '54px' }} />
          <col style={{ width: '175px' }} />
          <col />
          <col style={{ width: '150px' }} />
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
      {
        createArray(pageCount).map(e => {
          return (
            <button
              key={e}
              onClick={() => {
                onPageMove(e + 1);
                window.scrollTo(0, 300);
              }}
            >
              {e + 1}
            </button>
          )
        })
      }
    </section>
  );
};

export default PostSection;