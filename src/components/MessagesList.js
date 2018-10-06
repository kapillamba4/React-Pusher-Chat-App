import React from 'react';
import styled from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const cache = new CellMeasurerCache({
  defaultHeight: 60,
  fixedWidth: true,
});

const MessagesListWrapper = styled.div`
  height: calc(100% - 140px);
  background-color: #eef5f9;
  .row,
  .noRow {
    padding: 4px 16px;
    display: block;
    align-items: center;
    border-top: 1px solid #ddd;
    word-wrap: break-word;
  }
  .bold {
    font-weight: 600;
  }
  .noRow {
    height: 60px;
  }
  @media (max-width: 880px) {
    height: calc(100% - 182px);
  }
`;

const _rowRenderer = (user, messages, { index, key, parent, style }) => (
  <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
    {({ measure }) => (
      <div className="row" key={key} style={style}>
        <b className="bold">{messages[index].senderId}</b>: {messages[index].text}
      </div>
    )}
  </CellMeasurer>
);

const _noRowRenderer = () => <div className="noRow bold">No Messages</div>;

const MessagesList = ({ messages, user }) => (
  <MessagesListWrapper>
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          overscanRowCount={10}
          rowCount={messages.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={(...args) => _rowRenderer(user, messages, ...args)}
          noRowsRenderer={_noRowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
  </MessagesListWrapper>
);

export default MessagesList;
