import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PostSection from 'components/post/PostSection';
import PostTable from 'components/post/PostTable';

@inject('store')
@observer
class PostList extends Component {
  initialize = async () => {
    const { post } = this.props.store;
    try {
      await post.getPosts();
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.initialize();
  }
  render() {
    const { post } = this.props.store;
    console.log(post);
    return (
      <PostSection postCount={post.postCount}>
        <PostTable loading={post.loading} posts={post.postList} />
      </PostSection>
    );
  }
}

export default PostList;