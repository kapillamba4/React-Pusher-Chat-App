import React from 'react';
import styled from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});

const ChannelsListWrapper = styled.div`
  height: 100%;
  .row,
  .noRow {
    padding: 0 6px 0 12px;
    font-size: 1.25rem;
    line-height: 45px;
    display: flex;
    border-bottom: 1px solid #ddd;
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
`;

const _rowRenderer = (channelsList, switchChannel, { index, key, parent, style }) => (
  <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
    {({ measure }) => (
      <div className="row" key={key} style={style} onClick={() => switchChannel(channelsList[index].id)}>
        {channelsList[index].name}:{channelsList[index].id}
      </div>
    )}
  </CellMeasurer>
);

const _noRowRenderer = () => <div className="noRow bold">No Channels Found</div>;

const ChannelsList = ({ channelsList, switchChannel }) => (
  <ChannelsListWrapper>
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          overscanRowCount={10}
          rowCount={channelsList.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={(...args) => _rowRenderer(channelsList, switchChannel, ...args)}
          noRowsRenderer={_noRowRenderer}
        />
      )}
    </AutoSizer>
  </ChannelsListWrapper>
);

export default ChannelsList;
