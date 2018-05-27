import React from 'react';
import styled from 'styled-components';
import {List, AutoSizer} from 'react-virtualized';

const MessagesListWrapper = styled.div`
  height: calc(100% - 140px);
  background-color: #EEF5F9;
  .row, .noRow {
    padding: 0 25px;
    display: flex;
    align-items: center;
    border: 1px solid #DDD;
  }
  .bold {
    font-weight: 600;
  }
  .noRow {
    height: 50px;
  }
  .isScrollingPlaceholder {
    color: #DDD;
    font-style: italic;
  }
`;

const _rowRenderer = (user, messages, { index, isScrolling, key, style }) => (
  isScrolling ? (
    <div className="row isScrollingPlaceholder" key={key} style={style}>
      Scrolling...
    </div>
  ) : (
    <div className="row" key={key} style={style}>
      <span className="bold">{messages[index].senderId}</span>: {messages[index].text}
    </div>
  )
);

const _noRowRenderer = () => (
  <div className="noRow bold">
    No Messages Found
  </div>
);

const MessagesList = ({ messages, user }) => (
  <MessagesListWrapper>
    <AutoSizer>
      {({height, width}) => (
        <List
          height={height}
          overscanRowCount={10}
          rowCount={messages.length}
          rowHeight={50}
          rowRenderer={(...args) => _rowRenderer(user, messages, ...args)}
          noRowsRenderer={_noRowRenderer}
          width={width}>
        </List>
      )}
    </AutoSizer>
  </MessagesListWrapper>
);

export default MessagesList;
