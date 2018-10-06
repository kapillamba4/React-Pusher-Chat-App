import React, { Component } from 'react';
import ChatApp from './containers/ChatApp';
import styled from 'styled-components';
import AuthForm from './containers/AuthForm';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  .background-top-left {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: #039be5;
    border-bottom: 30px solid #0288d1;
    transform-origin: 0 0;
    transform: skewY(-30deg);
    box-shadow: 0 0 30px #89898a;
    z-index: -1;
  }
  .background-bottom-right {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 30%;
    background-color: #039be5;
    border-top: 30px solid #0288d1;
    transform-origin: 100% 100%;
    transform: skewY(150deg);
    box-shadow: 0 0 30px #89898a;
    z-index: -1;
  }
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <div className="background">
          <div className="background-top-left" />
          <div className="background-bottom-right" />
        </div>
        <Switch>
          <Route exact path="/app" component={ChatApp} />
          <Route exact path="/login" component={AuthForm} />
          <Route component={AuthForm} />
        </Switch>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({ ...state.authentication });
export default connect(
  mapStateToProps,
  null,
)(App);
