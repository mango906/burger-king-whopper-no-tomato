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
      if (post.postList.length) {
        return;
      }
      await post.getCount();
      await post.getPosts();
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.initialize();
    const prevScroll = sessionStorage.getItem("main-scroll");
    if (prevScroll !== null) {
      window.scrollTo(0, prevScroll)
    }
  }
  componentWillUnmount() {
    sessionStorage.setItem("main-scroll", window.scrollY)
  }
  render() {
    const { post } = this.props.store;
    return (
      <PostSection postCount={post.postCount} onPageMove={post.movePage}>
        <PostTable loading={post.loading} posts={post.postList} />
      </PostSection>
    );
  }
}

export default PostList;