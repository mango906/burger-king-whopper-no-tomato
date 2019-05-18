import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import PostDetailContainer from 'containers/post/PostDetailContainer';

const PostDetailPage = () => {
    return (
        <PageTemplate>
            <PostDetailContainer />
        </PageTemplate>
    );
};

export default PostDetailPage;