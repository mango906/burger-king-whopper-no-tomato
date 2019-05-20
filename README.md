# burger-king-whopper-no-tomato
코드잇 면접 전 사전 과제


## 시작하기

### 실행 환경
- Node.js v8^
- yarn
- MongoDB

### 설치
프로젝트를 클론합니다.

```bash
$ git clone https://github.com/seojeenyeok/burger-king-whopper-no-tomato
```

backend와 frontend 디렉터리에서 해당 커맨드로 패키지를 설치합니다

```bash
$ yarn
```

### 백엔드 개발 서버 가동

데이터베이스를 실행합니다

```bash
$ mongod --setParameter failIndexKeyTooLong=false
```
backend 디렉터리로 이동해 개발 서버를 실행합니다.
```bash
$ yarn start:dev
```

### 프론트엔드 개발 서버 가동

frontend 디렉터리로 이동해 개발 서버를 실행합니다.

```bash
$ yarn start
```

브라우저를 열고 http://localhost:3000/ 로 접속하면 사용할 수 있습니다.