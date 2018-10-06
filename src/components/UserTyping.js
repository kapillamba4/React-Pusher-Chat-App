import React, { Fragment } from 'react';
import styled from 'styled-components';

const UserTypingLayout = styled.div`
  height: 100%;
  background-color: #eef5f9;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 900;
`;

const UserTyping = ({ user }) => {
  return (
    <Fragment>
      {user ? (
        <UserTypingLayout>
          <div>Typing Indicator:</div>
          <div>
            {user.name}@{user.id} is typing
          </div>
        </UserTypingLayout>
      ) : (
        <UserTypingLayout>
          <div>Typing Indicator:</div>
          <div>&nbsp;</div>
        </UserTypingLayout>
      )}
    </Fragment>
  );
};

export default UserTyping;
