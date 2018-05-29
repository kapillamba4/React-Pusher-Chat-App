import React from 'react';
import styled from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';

const MessagesListWrapper = styled.div`
  height: calc(100% - 140px);
  background-color: #eef5f9;
  .row,
  .noRow {
    padding: 4px 25px;
    display: block;
    align-items: center;
    border: 1px solid #ddd;
    word-wrap: break-word;
  }
  .bold {
    font-weight: 600;
  }
  .noRow {
    height: 100px;
  }
  .isScrollingPlaceholder {
    color: #ddd;
    font-style: italic;
  }
  @media (max-width: 880px) {
    height: calc(100% - 182px);
  }
`;

const _rowRenderer = (user, messages, { index, isScrolling, key, style }) =>
  isScrolling ? (
    <div className="row isScrollingPlaceholder" key={key} style={style}>
      Scrolling...
    </div>
  ) : (
    <div className="row" key={key} style={style}>
      <b className="bold">{messages[index].senderId}</b>: {messages[index].text}
    </div>
  );

const _noRowRenderer = () => <div className="noRow bold">No Messages Found</div>;

const MessagesList = ({ messages, user }) => (
  <MessagesListWrapper>
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          overscanRowCount={10}
          rowCount={messages.length}
          rowHeight={100}
          rowRenderer={(...args) => _rowRenderer(user, messages, ...args)}
          noRowsRenderer={_noRowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
  </MessagesListWrapper>
);

export default MessagesList;
