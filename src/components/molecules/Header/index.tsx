import { ReactNode } from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
const Header = ({ title, leftIcon, rightIcon }: HeaderProps) => {
  return (
    <Container>
      {leftIcon || <div />}
      <span style={{ marginBottom: "16px" }}>{title}</span>
      {rightIcon}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 73px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  align-items: flex-end;
  justify-items: center;
  background-color: var(--black);
  font-weight: 500;
  font-size: 15.36px;
  line-height: 130%;
  color: var(--white);
`;
