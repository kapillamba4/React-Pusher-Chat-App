import React from 'react';
import styled from 'styled-components';
import { Button, Icon, Popup } from 'semantic-ui-react'
import ChannelModal from './ChannelModal';
import { Link } from 'react-router-dom';

const ChatHeaderWrapper = styled.div`
  height: 58px;
  background-color: white;
  display:flex;
  align-items: center;
  padding: 6px;
  .ui.primary.button {
    margin: 0 2px;
  }
  .right-chat-header {
    margin-left: auto;
    .user-avatar-chat-header {
      display: inline-block;
      margin: 12px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .bold {
    font-weight: 900;
  }
  span {
    font-size: 2rem;
    color: #DDD;
    font-style: italic;
  }
`;

const ChatHeader = ({ user, currentChannel, createChannel, joinChannel, username, name }) => (
  <ChatHeaderWrapper>
    <div className="left-chat-header">
      { !user && <span>Welcome</span> }
      { user && !currentChannel && <span>Creating a channel please wait...</span> }
      { user && currentChannel && <span>{currentChannel.name}:{currentChannel.id}</span> }
    </div>
    <div className="right-chat-header">
      { !user &&
        <span>Please Wait...</span>
      }
      { user &&
        <ChannelModal
          triggerBtn={<Button primary>Create a Channel</Button>}
          header="Create a new Channel"
          inputFieldTxt="Enter channel name..."
          content="A new Channel will be created with given name, share it's id with others to allow them to join"
          handleSubmit={createChannel}
          negativeBtnText="Exit"
          positiveBtnText="Submit">
        </ChannelModal>
      }
      { user &&
        <ChannelModal
          triggerBtn={<Button primary>Join a Channel</Button>}
          header="Join a new Channel"
          inputFieldTxt="Enter channel id..."
          content="Messages will be fetched from new channel joined, and you will be able to add new messages to the channel"
          handleSubmit={joinChannel}
          negativeBtnText="Exit"
          positiveBtnText="Submit">
        </ChannelModal>
      }
      { user &&
        <Popup
          trigger={<Icon className="user-avatar-chat-header" name="user circle outline" size="large" color="blue" circular={true} bordered={true}/>}
          content={<span className="bold">{name}@{username}</span>}/>
      }
      </div>
  </ChatHeaderWrapper>
);

export default ChatHeader;