import React, { Component } from 'react';
import { inject } from 'mobx-react';
import styles from './PostContainer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

@inject('store')
class PostContainer extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { postList, postCount } = this.props.store.post;
        return (
            <div className={cx('post-container')}>
                <header>
                    <h1 className={cx('header-title light')}>
                        버거킹 와퍼에
                        <br/>
                        토마토 빼고 주세요
                    </h1>
                </header>
                <section>
                    <h1 className={cx('post-count normal')}>총 {postCount}개의 글이 있습니다</h1>
                    <table className={cx('posts bold')}>
                        <colgroup>
                            <col style={{width: '54px'}}/>
                            <col style={{width: '175px'}}/>
                            <col/>
                            <col style={{width: '100px'}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">글 번호</th>
                                <th scope="col">글쓴이</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                postList.map(post => {
                                    return (
                                        <tr>
                                            <td>{post.id}</td>
                                            <td>{post.author}</td>
                                            <td>{post.title}</td>
                                            <td>{post.created}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}

export default PostContainer;