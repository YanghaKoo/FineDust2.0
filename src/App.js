import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainTemplate from 'pages/MainTemplate/'
import DetailTemplate from 'pages/DetailTemplate'
import NotFound from 'pages/NotFound'


import NavBar from "components/common/NavBar/NavBar";


// 리액트 라우팅 설정을 해 여기다가
class App extends Component {
  render() {    
    return (
      <Router>
        <div className="app">          
          <NavBar />
          <Switch>
            <Route
              path="/details/:id"
              component={DetailTemplate}
            />
            <Route
              exact
              path="/"
              component={MainTemplate}
            />
            <Route path='*' exact={true} component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
