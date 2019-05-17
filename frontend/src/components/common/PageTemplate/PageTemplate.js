import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => {
    return (
        <div className={cx('post-template')}>
            <header>
                <h1 className={cx('header-title light')}>
                    버거킹 와퍼에
                    <br />
                    토마토 빼고 주세요
                </h1>
            </header>
            {children}
        </div>
    );
};

export default PageTemplate;