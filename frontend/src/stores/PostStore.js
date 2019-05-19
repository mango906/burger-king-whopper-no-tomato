import { observable, action, toJS } from 'mobx';
import axios from 'axios';
import { SERVER } from 'config/config.json';

class PostStore {
  @observable postList = [];
  @observable postCount;
  @observable page = 1;
  @observable loading = false;
  @observable viewComments = [];
  @observable apiCall = false;

  @action
  getPosts = async () => {
    this.loading = true;
    await axios.get(`${SERVER}/post/${this.page}`)
      .then(res => {
        this.postList = res.data.posts;
        this.loading = false;
        this.apiCall = true;
      })
      .catch(e => {
        console.log(e);
      })
  }
  @action
  getCount = async () => {
    await axios.get(`${SERVER}/post/count`)
      .then(res => {
        this.postCount = res.data.count;
      })
      .catch(e => {
        console.log(e);
      })
  }
  @action
  setViewComments = (comments) => {
    this.viewComments = comments;
    console.log(toJS(this.viewComments));
  }
  @action
  addPost = ({ post }) => {
    const { _id, __v, password, ...data } = post;
    this.postList.pop();
    this.postList.unshift(data);
    this.postCount++;
  }
  @action
  removePost = (id) => {
    const find = this.postList.find(post => post.id === parseInt(id));
    this.postList.remove(find);
    this.postCount--;
  }
  @action
  updateViewComments = (data, postId) => {
    if (this.apiCall) {
      const find = this.postList.find(post => post.id === postId);
      find.comments.push(data);
    }
    this.viewComments = [...this.viewComments, data];
  }
  @action
  movePage = async (page) => {
    if (this.page === page) {
      return;
    }
    this.page = page;
    await this.getPosts();
  }
}

export default PostStore;