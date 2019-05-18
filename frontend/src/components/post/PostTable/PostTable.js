import React from 'react';
import styles from './PostTable.scss';
import classNames from 'classnames/bind';
import FakePost from '../FakePost';
import { Link } from 'react-router-dom';

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
        <tr key={post.id}>
            <td className={cx('post-id')}>{post.id}</td>
            <td className={cx('post-author')}>{post.author}</td>
            <td className={cx('post-content')}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
            </td>
            <td>{
                new Date().toLocaleDateString() === new Date(post.created).toLocaleDateString() ?
                    new Date(post.created).toLocaleTimeString()
                    :
                    new Date(post.created).toLocaleDateString()
            }</td>
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