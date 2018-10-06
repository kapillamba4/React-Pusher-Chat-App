import React from 'react';
import styled from 'styled-components';
import { List, AutoSizer } from 'react-virtualized';
import { Label } from 'semantic-ui-react';

const UsersListWrapper = styled.div`
  height: 100%;
  .row,
  .noRow {
    padding: 0 12px;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
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

const _rowRenderer = (user, usersList, { index, key, style }) => (
  <div className="row" key={key} style={style}>
    {usersList[index].name}@{usersList[index].id}
    {user.id === usersList[index].id && <Label>YOU</Label>}
  </div>
);

const _noRowRenderer = () => <div className="noRow bold">No Users Found</div>;

const UsersList = ({ user, usersList }) => (
  <UsersListWrapper>
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          overscanRowCount={10}
          rowCount={usersList.length}
          rowHeight={50}
          rowRenderer={(...args) => _rowRenderer(user, usersList, ...args)}
          noRowsRenderer={_noRowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
  </UsersListWrapper>
);

export default UsersList;
