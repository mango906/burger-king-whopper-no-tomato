import React from 'react';
import styles from './PostTable.scss';
import classNames from 'classnames/bind';
import FakePost from '../FakePost';

const cx = classNames.bind(styles);

const createArray = length => Array.from(Array(length).keys());

const PostTable = ({ loading, posts }) => {
    if (loading) {
        return (
            <tbody>
                {createArray(10).map(e => <FakePost key={e} />)}
            </tbody>
        )
    }
    if (!posts) return null;
    const postList = posts.map(post => (
        <tr>
            <td className={cx('post-id')}>{post.id}</td>
            <td>{post.author}</td>
            <td>{post.title}</td>
            <td>{post.created}</td>
        </tr>
    ));
    return (
        <tbody>
            {postList}
        </tbody>
    );
};

PostTable.defaultProps = {
    posts: [],
    loading: false,
}

export default PostTable;