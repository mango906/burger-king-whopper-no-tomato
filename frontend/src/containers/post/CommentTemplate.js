import React, { Component } from 'react';
import CommentSection from 'components/comment/CommentSection';
import CommentList from 'components/comment/CommentList';
import FullScreenLoader from 'components/common/FullScreenLoader';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { SERVER } from 'config/config.json';

@inject('store')
@observer
class CommentTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      author: "",
      password: "",
      content: ""
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSend = async () => {
    const { postId } = this.props;
    const { loading, comments, ...data } = this.state;
    this.setState({
      loading: true
    })
    await axios.post(`${SERVER}/comment/${postId}`, data)
      .then(res => {
        const { comment } = res.data;
        this.props.store.post.updateViewComments(comment, postId);
        this.setState({
          loading: false,
          author: "",
          password: "",
          content: ""
        })
      })
      .catch(e => {
        alert("댓글 작성에 실패하였습니다");
        this.setState({
          loading: false
        })
      })
  }
  render() {
    const { loading, ...data } = this.state;
    const { viewComments } = this.props.store.post;
    return (
      <CommentSection data={data} onChange={this.handleChange} onSend={this.handleSend}>
        <CommentList comments={viewComments} />
        {loading && <FullScreenLoader />}
      </CommentSection>
    );
  }
}

export default CommentTemplate;