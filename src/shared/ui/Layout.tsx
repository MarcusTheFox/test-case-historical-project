import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 1080px;
  background: #F4F5F9;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  border-left: 1px solid rgba(66, 86, 122, 0.1);
  border-right: 1px solid rgba(66, 86, 122, 0.1);

  @media (max-width: 768px) {
    border: none;
    display: flex;
    flex-direction: column;
    padding-bottom: 80px; /* Space for bottom navigation */
  }
`;

export const Title = styled.h2`
  position: absolute;
  left: 80px;
  top: 170px;
  width: 353px;
  font-family: 'PT Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 56px;
  line-height: 120%;
  color: #42567A;
  z-index: 2;
  margin: 0;

  &::before {
    content: '';
    position: absolute;
    left: -80px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 120px;
    background: linear-gradient(to bottom, #3877EE, #EF5DA8);
  }

  @media (max-width: 768px) {
    position: static;
    left: 20px;
    top: 0;
    font-size: 20px;
    line-height: 120%;
    width: auto;
    padding: 80px 20px 0;
    &::before {
      display: none;
    }
  }
`;
