import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import actions from '../Actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    width: 300px;
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
  }

  _createUser(e) {
    if (this.state.name.length && this.state.username.length) {
      this.props.createUser(this.state);
    }
  }

  render() {
    const { name, username } = this.state;
    return (
      <AuthFormWrapper>
        {/*<div className="app-header">*/}
        {/*React Chat using Pusher SDK*/}
        {/*</div>*/}
        <div className="app-header" onKeyPress={this._createUser}>
          Enter Username & Name to Login
        </div>
        <Input
          className="chat-auth-input"
          icon="users"
          inverted={true}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder="Enter your name"
          value={name}
        />
        <Input
          className="chat-auth-input"
          icon="users"
          inverted={true}
          onChange={e => this.setState({ username: e.target.value })}
          placeholder="Enter username"
          value={username}
        />
        <Link to="/app">
          <Button primary className="login-btn" style={{ display: 'block' }} onClick={this._createUser}>
            Login
          </Button>
        </Link>
      </AuthFormWrapper>
    );
  }
}

const mapStateToProps = state => ({ ...state.authentication });
const matchDispatchToProps = dispatch => bindActionCreators({ ...actions.authentication }, dispatch);

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(AuthForm);
