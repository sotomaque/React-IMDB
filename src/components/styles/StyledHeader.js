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

export const StyledTMDBLogo = styled.img`
  width: 100px;
  margin-top: 15px;
  float: right;

  @media screen and (max-width: 500px) {
    display: inline-block;
    width: 60px;
    margin-top: 0px;
  }
`;
