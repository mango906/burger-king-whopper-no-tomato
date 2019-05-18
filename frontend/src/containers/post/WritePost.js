import React, { Component } from 'react';
import WritePostForm from 'components/post/WritePostForm';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { SERVER } from 'config/config.json';
import { inject } from 'mobx-react';

@inject('store')
class WritePost extends Component {
    state = {
        author: "",
        title: "",
        password: "",
        content: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleCancel = () => {
        const cancel = window.confirm("글 작성을 취소하시겠습니까?");
        cancel && this.props.history.goBack();
    }
    handleSend = async () => {
        const { author, title, password, content } = this.state;
        if (!author || !title || !password || !content) {
            alert("내용을 모두 작성해주세요");
            return;
        }
        await axios.post(`${SERVER}/post`, this.state)
            .then(res => {
                console.log(res);
                alert("작성에 성공하였습니다.");
                this.props.store.post.addPost(res.data);
                this.props.history.push("/");
            })
    }
    render() {
        return (
            <WritePostForm data={this.state} onChange={this.handleChange} onCancel={this.handleCancel} onSend={this.handleSend} />
        );
    }
}

export default withRouter(WritePost);