import styled from 'styled-components';

export const NavButton = styled.button<{ disabled?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.5);
  background: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background: #FFFFFF;
  }

  svg {
    stroke: #42567A;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    svg {
        width: 6px;
        height: 10px;
    }
  }
`;
