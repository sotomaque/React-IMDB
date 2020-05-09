import styled from 'styled-components';

export const StyledHeader = styled.div`
  background: #1c1c1c;
  padding: 0 20px;
  box-sizing: border-box;

  .header-content {
    max-width: 1280px;
    min-height: 100px;
    padding: 20px 0px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 500px) {
      max-width: 1280px;
      min-height: 0px;
    }
  }
`;

export const StyledRMDBLogo = styled.img`
  width: 150px;
  margin-top: 20px;

  @media screen and (max-width: 500px) {
    width: 100px;
    margin-top: 5px;
  }
`;


export const StyledHeaderLinks = styled.ul`
  list-style-type: none;
  overflow: hidden;
  background-color: #333;
  display: flex;
  justify-content: flex-end;
  padding: 0;

  li {
    display: flex;
    justify-content: flex-end;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover {
    background-color: #111;
  }
`
