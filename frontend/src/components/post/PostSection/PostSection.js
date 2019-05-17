import React from 'react';
import styles from './PostSection.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostSection = ({ children, postCount }) => {
    return (
        <section>
            <h1 className={cx('post-count normal')}>총 {postCount}개의 글이 있습니다</h1>
            <table className={cx('posts bold')}>
                <colgroup>
                    <col style={{ width: '54px' }} />
                    <col style={{ width: '175px' }} />
                    <col />
                    <col style={{ width: '100px' }} />
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
        </section>
    );
};

export default PostSection;