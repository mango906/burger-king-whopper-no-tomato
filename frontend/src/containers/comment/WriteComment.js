import React, { Component } from "react";
import WriteCommentForm from "components/comment/WriteCommentForm";
import FullScreenLoader from "components/common/FullScreenLoader";
import { inject, observer } from "mobx-react";
import axios from "axios";
import { SERVER } from "config/config.json";

@inject("store")
@observer
class WriteComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      author: "",
      password: "",
      content: ""
    };
  }
  handleChange = e => {
    const targetName = e.target.name;
    const rows = e.target.value.split("\n").length;
    if (rows > 15) {
      return;
    }
    this.setState({
      [targetName]: e.target.value
    });
  };
  handleSubmit = async () => {
    const { author, content } = this.state;
    const { type, commentId } = this.props;
    const nullReg = /(\s*)/g;
    if (!author.replace(nullReg, "") || !content.replace(nullReg, "")) {
      alert("양식을 전부 채워주세요");
      return;
    }
    const { id: postId } = this.props.store.post.viewPost;
    const { loading, comments, ...data } = this.state;
    this.setState({
      loading: true
    });
    let url = `${SERVER}/comment/${postId}`;
    if (type === "recomment") {
      url += `/${this.props.commentId}`;
    }
    console.log(url);
    await axios
      .post(url, data)
      .then(res => {
        const { comment } = res.data;
        console.log(type);
        if (type === "comment") {
          this.props.store.post.updateViewComments(comment, postId);
        } else if (type === "recomment") {
          this.props.store.post.addRecommentToViewComments(comment, commentId);
        }
        this.setState({
          loading: false,
          author: "",
          password: "",
          content: ""
        });
      })
      .catch(e => {
        console.log(e);
        alert("댓글 작성에 실패하였습니다");
        this.setState({
          loading: false
        });
      });
  };
  render() {
    const { loading, ...data } = this.state;
    return (
      <>
        <WriteCommentForm
          data={data}
          onChange={this.handleChange}
          onSend={this.handleSubmit}
          type={this.props.type}
        />
        {loading && <FullScreenLoader />}
      </>
    );
  }
}

export default WriteComment;
