import React, { Component } from "react";
import WritePostForm from "components/post/WritePostForm";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { SERVER } from "config/config.json";
import { inject } from "mobx-react";
import FullscreenLoader from "components/common/FullScreenLoader";

@inject("store")
class WritePost extends Component {
  state = {
    loading: false,
    author: "",
    title: "",
    password: "",
    content: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCancel = () => {
    const cancel = window.confirm("글 작성을 취소하시겠습니까?");
    cancel && this.props.history.goBack();
  };
  handleSend = async () => {
    const { author, title, content } = this.state;
    const nullReg = /(\s*)/g;
    if (
      !author.replace(nullReg, "") ||
      !title.replace(nullReg, "") ||
      !content.replace(nullReg, "")
    ) {
      alert("내용을 모두 작성해주세요");
      return;
    }
    this.setState({
      loading: true
    });
    await axios
      .post(`${SERVER}/post`, this.state)
      .then(async res => {
        const { post } = this.props.store;
        if (post.apiCall) {
          post.addPost(res.data);
        }
        this.setState({
          loading: false
        });
        sessionStorage.setItem("main-scroll", 0);
        alert("작성에 성공하였습니다.");
        this.props.history.push("/");
      })
      .catch(e => {
        console.log(e);
        this.setState({
          loading: false
        });
        alert("작성 중 오류가 발생하였습니다");
      });
  };
  componentDidMount() {
    window.scrollTo(0, 80);
  }
  render() {
    const { loading } = this.state;
    return (
      <>
        <WritePostForm
          data={this.state}
          onChange={this.handleChange}
          onCancel={this.handleCancel}
          onSend={this.handleSend}
          type="new"
        />
        {loading && <FullscreenLoader />}
      </>
    );
  }
}

export default withRouter(WritePost);
