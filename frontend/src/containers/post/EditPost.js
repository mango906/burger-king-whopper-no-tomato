import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CheckPassword from "components/post/CheckPassword";
import { SERVER } from "config/config.json";
import axios from "axios";
import FullscreenLoader from "components/common/FullScreenLoader";
import WritePostForm from "components/post/WritePostForm";
import { inject } from "mobx-react";

@inject("store")
class EditPost extends Component {
  state = {
    title: "",
    content: "",
    password: "",
    auth: false,
    loading: false
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };
  handleCheck = async () => {
    const { password } = this.state;
    const { id } = this.props.match.params;
    const nullReg = /(\s*)/g;
    if (!password.replace(nullReg, "")) {
      alert("비밀번호를 입력해주세요");
      return;
    }
    await axios
      .get(`${SERVER}/post/check/${id}/${password.toString()}`)
      .then(async () => {
        this.setState({
          auth: true
        });
        await this.initialize();
      })
      .catch(e => {
        const { status } = e.response;
        if (status === 401) {
          alert("비밀번호가 틀립니다");
          return;
        } else {
          alert("에러가 발생하였습니다");
          return;
        }
      });
  };
  handleCancel = () => {
    const cancel = window.confirm("글 수정을 취소하시겠습니까?");
    cancel && this.props.history.goBack();
  };
  handleSubmit = async () => {
    const nullReg = /(\s*)/g;
    const { loading, auth, ...data } = this.state;
    if (
      !data.title.replace(nullReg, "") ||
      !data.content.replace(nullReg, "")
    ) {
      alert("내용을 모두 채워주세요");
      return;
    }
    const { id } = this.props.match.params;
    this.setState({
      loading: true
    });
    await axios
      .patch(`${SERVER}/post/${id}`, data)
      .then(({ data }) => {
        const { post } = data;
        alert("수정에 성공하였습니다");
        this.setState({
          loading: false
        });
        this.props.store.post.updatePostTitle(post);
        this.props.history.push(`/post/${id}`);
      })
      .catch(e => {
        console.log(e);
      });
  };
  initialize = async () => {
    const { id } = this.props.match.params;
    this.setState({
      loading: true
    });
    await axios
      .get(`${SERVER}/post/view/${id}`)
      .then(res => {
        const { title, content } = res.data.view;
        this.setState({
          title,
          content,
          loading: false
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { auth, password, loading } = this.state;
    return (
      <>
        {auth ? (
          <WritePostForm
            data={this.state}
            onChange={this.handleChange}
            onCancel={this.handleCancel}
            onSend={this.handleSubmit}
          />
        ) : (
          <CheckPassword
            value={password}
            onChange={this.handleChange}
            onCheck={this.handleCheck}
            onCancel={this.handleCancel}
          />
        )}
        {loading && <FullscreenLoader />}
      </>
    );
  }
}

export default withRouter(EditPost);
