import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, TextArea, Icon } from 'semantic-ui-react';

const MessageComposerWrapper = styled.div`
  height: 82px;
  background-color: white;
  .message-composer-icon {
    display: inline-block;
    margin: 12px;
    &:hover {
      cursor: pointer;
    }
  }
`;

class MessageComposer extends Component {
  state = {
    messageComposed: '',
  };

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._keyPress = this._keyPress.bind(this);
  }

  _handleChange(e) {
    e.preventDefault();
    this.props.triggerStartTyping();
    this.setState({
      messageComposed: e.target.value,
    });
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.addMessage(this.state.messageComposed);
    this.setState({
      messageComposed: '',
    });
  }

  _keyPress(e) {
    if (e.keyCode === 13) {
      this._onSubmit(e);
    }
  }

  render() {
    const placeHolder = this.props.currentChannel ? 'Compose' : 'Initializing....';
    return (
      <MessageComposerWrapper>
        <Form>
          <TextArea
            placeholder={placeHolder}
            disabled={!this.props.currentChannel}
            style={{ height: 82, width: 'calc(100% - 80px)', borderRadius: 4, resize: 'none' }}
            value={this.state.messageComposed}
            onKeyDown={this._keyPress}
            onChange={this._handleChange}
          />
          <Icon
            className="message-composer-icon"
            name="send outline"
            size="big"
            color="blue"
            circular={true}
            bordered={true}
            onClick={this._onSubmit}
          />
        </Form>
      </MessageComposerWrapper>
    );
  }
}

export default MessageComposer;
