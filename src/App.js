import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/menuBar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import SinglePost from './pages/SinglePost';
import ProfileSettings from './pages/ProfileSettings';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home}/>
          <AuthRoute exact path='/login' component={Login}/>
          <AuthRoute exact path='/register' component={Register}/>
          <Route exact path='/profile/:username/settings' component={ProfileSettings}/>
          <Route path="/post/:username/:postId" component={SinglePost}/>
          <Route exact path='/profile/:username' component={Profile}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;