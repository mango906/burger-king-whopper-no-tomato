import { observable, action } from "mobx";
import axios from "axios";
import { SERVER } from "config/config.json";

class PostStore {
  @observable postList = [];
  @observable postCount;
  @observable page = 1;
  @observable loading = false;
  @observable viewPost = {};
  @observable viewComments = [];
  @observable apiCall = false;

  @action
  getPosts = async () => {
    this.loading = true;
    await axios
      .get(`${SERVER}/post/${this.page}`)
      .then(res => {
        this.postList = res.data.posts;
        this.loading = false;
        this.apiCall = true;
      })
      .catch(e => {
        console.log(e);
      });
  };
  @action
  getCount = async () => {
    await axios
      .get(`${SERVER}/post/count`)
      .then(res => {
        this.postCount = res.data.count;
      })
      .catch(e => {
        console.log(e);
      });
  };
  @action
  setViewContent = async data => {
    const { comments, ...post } = data;
    this.viewComments = comments;
    this.viewPost = post;
  };
  @action
  addPost = ({ post }) => {
    const { _id, __v, password, ...data } = post;
    this.postList.unshift(data);
    this.postCount++;
    this.postList.length > 10 && this.postList.pop();
  };
  @action
  removePost = async password => {
    const { id } = this.viewPost;
    try {
      await axios.delete(`${SERVER}/post/${id}/${password}`);
      this.removePostToList(id);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  @action
  removeComment = async (password, commentId) => {
    const { id } = this.viewPost;
    try {
      await axios.delete(`${SERVER}/comment/${id}/${commentId}/${password}`);
      this.viewComments = this.viewComments.filter(
        comment => comment.id !== commentId
      );
      if (this.apiCall) {
        const find = this.postList.find(post => post.id === id);
        find.comments.pop();
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  @action
  removePostToList = async id => {
    if (this.apiCall) {
      const find = this.postList.find(post => post.id === parseInt(id));
      this.postList.remove(find);
      this.postCount--;
      await this.getPosts();
    }
  };
  @action
  updateViewComments = (data, postId) => {
    if (this.apiCall) {
      const find = this.postList.find(post => post.id === postId);
      find.comments.push(data);
    }
    this.viewComments = [...this.viewComments, data];
  };
  @action
  movePage = async page => {
    if (this.page === page) {
      return;
    }
    this.page = page;
    await this.getPosts();
  };
  @action
  updatePostTitle = async post => {
    if (this.apiCall) {
      const find = this.postList.find(e => e.id === post.id);
      find.title = post.title;
    }
  };
}

export default PostStore;
