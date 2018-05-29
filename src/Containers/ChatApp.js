import React, { Component } from 'react';
import styled from 'styled-components';
import ChatHeader from '../Components/ChatHeader';
import MessageComposer from '../Components/MessageComposer';
import ChannelsList from '../Components/ChannelsList';
import UsersList from '../Components/UsersList';
import MessagesList from '../Components/MessagesList';
import UserTyping from '../Components/UserTyping';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../Actions';

const ChatAppWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
  max-width: 96%;
  height: 540px;
  margin-top: 80px;
  margin-bottom: 80px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.8;
  z-index: 110;
  .chat-left-sidebar,
  .chat-right-sidebar {
    width: 20%;
    height: 100%;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
  .chat-user-list {
    height: calc(100% - 82px);
  }
  .chat-user-typing {
    height: 82px;
  }
  .chat-middlebar {
    width: 60%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
  @media (max-width: 880px) {
    .chat-left-sidebar {
      display: none;
    }
    .chat-right-sidebar {
      display: none;
    }
    .chat-middlebar {
      width: 90%;
    }
  }
`;

class ChatApp extends Component {
  componentDidMount() {
    if (!this.props.username && !this.props.createUserStarted) {
      window.location.href = '/login';
    }

    if (this.props.username) {
      this.props.connect(this.props.username);
    }
    this.subscribe = this.subscribe.bind(this);
    this.triggerStartTyping = this.triggerStartTyping.bind(this);
  }

  subscribe() {
    if (this.props.user && this.props.currentChannel) {
      if (!this.props.user.roomSubscriptions[this.props.currentChannel.id]) {
        this.props.user.subscribeToRoom({
          roomId: this.props.currentChannel.id,
          hooks: {
            onNewMessage: message => {
              const { createdAt, senderId, text, roomId } = message;
              if (senderId !== this.props.user.id && roomId === this.props.currentChannel.id) {
                this.props.receiveMessage({
                  createdAt,
                  senderId,
                  text,
                });
              }
            },
            onUserJoined: user => {
              this.props.userJoined(user);
            },
            onUserLeft: user => {
              this.props.userLeft(user);
            },
            onUserWentOffline: user => {
              this.props.userLeft(user);
            },
            onUserStartedTyping: user => {
              this.props.userStartedTyping(user);
            },
            onUserStoppedTyping: user => {
              this.props.userStoppedTyping(user);
            },
          },
          messageLimit: 0,
        });
      }
    }
  }

  getSessionData(props) {
    return { user: props.user, roomId: props.currentChannel ? props.currentChannel.id : undefined };
  }

  componentWillReceiveProps(props) {
    if (!props.username && !props.createUserStarted) {
      window.location.href = '/login';
    }

    const session = this.getSessionData(props);
    if (!this.props.username && props.username) {
      this.props.connect(props.username);
    }

    if (!this.props.user && props.user) {
      this.props.loadChannels(session);
      this.props.createChannel('general', session);
    }

    if (!props.currentChannel && props.channelsList && props.channelsList.length && props.user) {
      this.props.changeChannel(props.channelsList[0].id, session);
    }

    if (this.props.currentChannel && this.props.currentChannel.id !== props.currentChannel.id && props.user) {
      this.props.loadMessages(props.currentChannel.id, session);
    }

    this.subscribe();
  }

  triggerStartTyping() {
    this.props.user.isTypingIn({ roomId: this.props.currentChannel.id }).catch(console.error);
  }

  render() {
    return (
      <ChatAppWrapper>
        <div className="chat-left-sidebar">
          <ChannelsList
            channelsList={this.props.channelsList}
            switchChannel={channelId => this.props.changeChannel(channelId, this.getSessionData(this.props))}
          />
        </div>
        <div className="chat-middlebar">
          <ChatHeader
            createChannel={channelName => this.props.createChannel(channelName, this.getSessionData(this.props))}
            joinChannel={channelId => this.props.changeChannel(channelId, this.getSessionData(this.props))}
            currentChannel={this.props.currentChannel}
            username={this.props.username}
            resetStore={() => {
              this.props.resetStoreAuth();
              this.props.resetStoreMessage();
            }}
            name={this.props.name}
            user={this.props.user}
          />
          <MessagesList messages={this.props.messages} user={this.props.user} />
          <MessageComposer
            triggerStartTyping={this.triggerStartTyping}
            typing={this.props.typing}
            currentChannel={this.props.currentChannel}
            addMessage={message => this.props.addMessage(message, this.getSessionData(this.props))}
          />
        </div>
        <div className="chat-right-sidebar">
          <div className="chat-user-list">
            <UsersList usersList={this.props.usersList} />
          </div>
          <div className="chat-user-typing">
            <UserTyping user={this.props.userTyping[0]} />
          </div>
        </div>
      </ChatAppWrapper>
    );
  }
}

const mapStateToProps = state => ({ ...state.message, ...state.authentication });
const matchDispatchToProps = dispatch =>
  bindActionCreators({ ...actions.message, ...actions.authentication }, dispatch);

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(ChatApp);
