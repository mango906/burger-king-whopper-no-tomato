import { observable } from 'mobx';

class PostStore {
  @observable postList = [
    {
      id: 1,
      author: "서진혁",
      title: "대한항공 마일리지 전환 이벤트 당첨자 안내",
      content: "버거킹 와퍼에 토마토는 빼고 주세요 왜냐면 버거킹 와퍼는 토마토가 없어야 맛있거든요",
      created: "2019.05.16",
    },
    {
      id: 2,
      author: "서진혁",
      title: "대한항공 마일리지 전환 이벤트 당첨자 안내",
      content: "버거킹 와퍼에 토마토는 빼고 주세요 왜냐면 버거킹 와퍼는 토마토가 없어야 맛있거든요",
      created: "2019.05.16",
    },
    {
      id: 3,
      author: "서진혁",
      title: "대한항공 마일리지 전환 이벤트 당첨자 안내",
      content: "버거킹 와퍼에 토마토는 빼고 주세요 왜냐면 버거킹 와퍼는 토마토가 없어야 맛있거든요",
      created: "2019.05.16",
    },
    {
      id: 4,
      author: "서진혁",
      title: "대한항공 마일리지 전환 이벤트 당첨자 안내",
      content: "버거킹 와퍼에 토마토는 빼고 주세요 왜냐면 버거킹 와퍼는 토마토가 없어야 맛있거든요",
      created: "2019.05.16",
    }
  ];
  @observable postCount = 4;
}

export default PostStore;