import React from 'react';
import "./FakeDetail.scss";

const FakeDetail = () => {
    return (
        <div className="FakeDetail">
            <div className="fake-header">
                <h1 className="fake-title"><span className="gray-box" style={{ width: '250px' }} /></h1>
                <div className="fake-desc">
                    <span className="gray-box" style={{ width: '150px', marginRight: '16px' }} />
                    <span className="gray-box" style={{ width: '200px' }} />
                </div>
            </div>
            <div className="fake-content">
                <span className="gray-box" style={{ width: '350px' }} />
                <span className="gray-box" style={{ width: '200px' }} />
                <span className="gray-box" style={{ width: '450px' }} />
                <span className="gray-box" style={{ width: '120px' }} />
                <span className="gray-box" style={{ width: '850px' }} />
                <span className="gray-box" style={{ width: '200px' }} />
                <span className="gray-box" style={{ width: '450px' }} />
            </div>
        </div>
    );
};

export default FakeDetail;