import styled from 'styled-components';

export const StyledRole = styled.div`
  font-family: 'Abel', sans-serif;
  color: #fff;
  background: #1c1c1c;
  border-radius: 20px;
  padding: 5px;
  text-align: center;

  img {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;
  }

  .role-name {
    display: block;
    font-size: 18px;
    margin: 10px 0 0 0;
  }

  .role-character {
    display: block;
    font-size: 16px;
    margin: 0 0 10px 0;
  }
`;
