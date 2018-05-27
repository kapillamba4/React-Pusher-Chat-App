import React from 'react';
import styled from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';

const ChannelsListWrapper = styled.div`
  height: 100%;
  .row,
  .noRow {
    padding: 0 25px;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #ddd;
    &:hover {
      cursor: pointer;
      background-color: #039be5;
    }
  }
  .bold {
    font-weight: 600;
  }
  .noRow {
    height: 50px;
  }
  .isScrollingPlaceholder {
    color: #ddd;
    font-style: italic;
  }
`;

const _rowRenderer = (channelsList, switchChannel, { index, isScrolling, key, style }) =>
  isScrolling ? (
    <div className="row isScrollingPlaceholder" key={key} style={style}>
      Scrolling...
    </div>
  ) : (
    <div className="row" key={key} style={style} onClick={() => switchChannel(channelsList[index].id)}>
      {channelsList[index].name}:{channelsList[index].id}
    </div>
  );

const _noRowRenderer = () => <div className="noRow bold">No Channels Found</div>;

const ChannelsList = ({ channelsList, switchChannel }) => (
  <ChannelsListWrapper>
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          overscanRowCount={10}
          rowCount={channelsList.length}
          rowHeight={50}
          rowRenderer={(...args) => _rowRenderer(channelsList, switchChannel, ...args)}
          noRowsRenderer={_noRowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
  </ChannelsListWrapper>
);

export default ChannelsList;
