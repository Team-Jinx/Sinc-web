import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface BtnProps {
  className?: string;
  children?: ReactNode;
  type: "primary" | "gray" | "empty";
  onClick: () => void;
}
const Btn = ({ className, children, type, onClick }: BtnProps) => {
  return (
    <Container
      className={className}
      type={type}
      role="button"
      onClick={onClick}
    >
      {children}
    </Container>
  );
};

export default Btn;

interface ContainerProps {
  type: "primary" | "gray" | "empty";
}
const Container = styled.div<ContainerProps>`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ type }) =>
    type === "primary"
      ? css`
          background-color: var(--primary);
          color: #141414;
        `
      : type === "gray"
      ? css`
          background: #303030;
          color: var(--white);
        `
      : css`
          border: 0.1rem solid var(--white);
        `}
`;
