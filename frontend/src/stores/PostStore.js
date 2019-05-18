import { observable, action } from 'mobx';
import axios from 'axios';
import { SERVER } from 'config/config.json';

class PostStore {
  @observable postList = [];
  @observable postCount;
  @observable page = 1;
  @observable loading = false;

  @action
  getPosts = async () => {
    this.loading = true;
    await axios.get(`${SERVER}/post/${this.page}`)
      .then(res => {
        this.postList = res.data.posts;
        this.loading = false;
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
  addPost = ({ post }) => {
    const { _id, __v, password, ...data } = post;
    this.postList.unshift(data);
    this.postCount++;
  }
  @action
  removePost = (id) => {
    const find = this.postList.find(post => post.id === parseInt(id));
    this.postList.remove(find);
    this.postCount--;
  }
}

export default PostStore;