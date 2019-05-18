import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { SERVER } from 'config/config.json';
import PostDetail from 'components/post/PostDetail';

@inject('store')
@observer
class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      post: {},
      comments: []
    }
  }
  componentDidMount() {
    this.initialize();
  }
  initialize = async () => {
    const { id } = this.props.match.params;
    this.setState({
      loading: true,
    })
    await axios.get(`${SERVER}/post/view/${id}`)
      .then(res => {
        const { comments, ...post } = res.data.view;
        this.setState({
          post,
          comments,
          loading: false,
        })
      })
      .catch(e => {
        alert("존재하지 않는 글입니다");
        this.props.store.post.removePost(id);
        this.props.history.goBack();
      })
  }
  render() {
    const { post, comments, loading } = this.state;
    return (
      <PostDetail post={post} loading={loading} />
    );
  }
}


export default withRouter(PostDetailContainer);