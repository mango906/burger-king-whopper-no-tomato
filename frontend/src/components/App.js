import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage, NotFoundPage, PostDetailPage, WritePostPage, EditPostPage } from 'pages';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/post/:id" component={PostDetailPage} />
      <Route exact path="/write" component={WritePostPage} />
      <Route exact path="/edit/:id" component={EditPostPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;