import { Btn } from "src/components/atoms";
import styled, { css } from "styled-components";

interface BottomBtnProps {
  txt: string;
  isAtv: boolean;
  handleClickBtn: () => void;
}
const BottomBtn = ({ txt, isAtv, handleClickBtn }: BottomBtnProps) => {
  return (
    <Container isAtv={isAtv} type="primary" onClick={handleClickBtn}>
      {txt}
    </Container>
  );
};

export default BottomBtn;

interface ContainerProps {
  isAtv: boolean;
}
const Container = styled(Btn)<ContainerProps>`
  position: fixed;
  z-index: 11;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  color: var(--gray_1000);

  transition: 0.3s;
  ${({ isAtv }) =>
    !isAtv &&
    css`
      color: var(--gray_400);
      background-color: var(--gray_100);
    `}
`;
