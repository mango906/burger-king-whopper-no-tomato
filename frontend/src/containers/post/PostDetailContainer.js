import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { SERVER } from 'config/config.json';
import PostDetail from 'components/post/PostDetail';
import WriteComment from 'containers/comment/WriteComment';
import CommentList from 'components/comment/CommentList';

@inject('store')
@observer
class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      post: {},
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
        const { view } = res.data;
        this.props.store.post.setViewContent(view);
        this.setState({
          loading: false,
        })
      })
      .catch( _ => {
        alert("존재하지 않는 글입니다");
        this.props.store.post.removePostToList(id);
        this.props.history.goBack();
      })
    window.scrollTo(0, 0);
  }
  handleRemovePost = async () => {
    const password = prompt("비밀 번호를 입력하세요");
    if(password === null){
      return;
    }
    const res = await this.props.store.post.removePost(password);
    if(res){
      alert("삭제에 성공했습니다");
      this.props.history.push("/");
    }else {
      alert("삭제에 실패하였습니다");
    }
  }
  handleRemoveComment = async (id) => {
    const password = prompt("비밀 번호를 입력하세요");
    if(password === null){
      return;
    }
    const res = await this.props.store.post.removeComment(password, id);
    if(!res) {
      alert("비밀 번호가 틀렸습니다");
    }
  }
  render() {
    const { loading } = this.state;
    const { viewPost, viewComments } = this.props.store.post;
    return (
      <>
        <PostDetail post={viewPost} loading={loading} onRemove={this.handleRemovePost}/>
        <CommentList comments={viewComments} onRemove={this.handleRemoveComment}/>
        <WriteComment postId={viewPost.id} />
      </>
    );
  }
}


export default withRouter(PostDetailContainer);