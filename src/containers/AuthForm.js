import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const AuthFormWrapper = styled.div`
  position: absolute;
  top: calc(50% - 210px);
  left: calc(50% - 210px);
  border-radius: 8px;
  opacity: 0.6;
  width: 420px;
  height: 420px;
  z-index: 100;
  overflow: hidden;
  border: 1px solid #ddd;
  background-color: rgb(255, 255, 255, 0.6);
  .app-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: rgb(3, 155, 229, 0.6);
    font-size: 1.75rem;
  }
  .ui.inverted.input,
  .ui.primary.button {
    display: block;
    max-width: 400px;
    min-width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .chat-auth-input {
    width: calc(100% - 40px);
  }
  @media (max-width: 399px) {
    .chat-auth-input {
      width: 300px;
    }
    .app-header {
      font-size: 1.5rem;
    }
  }
`;

class AuthForm extends Component {
  state = {
    name: '',
    username: '',
  };

  constructor(props) {
    super(props);
    this._createUser = this._createUser.bind(this);
    this._keyPress = this._keyPress.bind(this);
  }

  _createUser() {
    if (this.state.name.length && this.state.username.length) {
      this.props.createUser(this.state);
    }
  }

  _keyPress(e) {
    if (e.key === 'Enter') {
      this.props.createUser(this.state);
      this.props.history.push('/app');
    }
  }

  render() {
    const { name, username } = this.state;
    return (
      <AuthFormWrapper>
        {/*<div className="app-header">*/}
        {/*React Chat using Pusher SDK*/}
        {/*</div>*/}
        <div className="app-header">Enter Username & Name to Login</div>
        <Input
          className="chat-auth-input"
          size="big"
          // icon="users"
          onKeyPress={this._keyPress}
          inverted={true}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder="Enter your name"
          value={name}
        />
        <Input
          className="chat-auth-input"
          size="big"
          // icon="users"
          inverted={true}
          onKeyPress={this._keyPress}
          onChange={e => this.setState({ username: e.target.value })}
          placeholder="Enter username"
          value={username}
        />
        <Link to="/app">
          <Button primary size="large" className="login-btn" style={{ display: 'block' }} onClick={this._createUser}>
            Login
          </Button>
        </Link>
      </AuthFormWrapper>
    );
  }
}

const mapStateToProps = state => ({ ...state.authentication });
const matchDispatchToProps = dispatch => bindActionCreators({ ...actions.authentication }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps,
  )(AuthForm),
);
