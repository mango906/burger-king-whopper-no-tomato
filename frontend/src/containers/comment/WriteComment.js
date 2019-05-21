import React, { Component } from 'react';
import WriteCommentForm from 'components/comment/WriteCommentForm';
import FullScreenLoader from 'components/common/FullScreenLoader';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { SERVER } from 'config/config.json';

@inject('store')
@observer
class WriteComment extends Component {
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
    const targetName = e.target.name;
    const rows = e.target.value.split('\n').length;
    if(rows > 15){
      return;
    }
    this.setState({
      [targetName]: e.target.value
    })
  }
  handleSend = async () => {
    const { author, content } = this.state;
    const nullReg = /(\s*)/g;
    if (!author.replace(nullReg, "") || !content.replace(nullReg, "")) {
      alert("양식을 전부 채워주세요");
      return;
    }
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
    return (
      <>
        <WriteCommentForm data={data} onChange={this.handleChange} onSend={this.handleSend}/>
        {loading && <FullScreenLoader />}
      </>
    );
  }
}

export default WriteComment;