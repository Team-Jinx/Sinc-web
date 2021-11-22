import { Dispatch, SetStateAction, useState } from "react";
import { Btn } from "src/components/atoms";
import { Header } from "src/components/molecules";
import styled, { css } from "styled-components";

interface MainProps {
  setPageNum: Dispatch<SetStateAction<number>>;
}
const Main = ({ setPageNum }: MainProps) => {
  const handleClickBottom = () => {
    setPageNum(2);
  };
  return (
    <Container>
      <Header title="펀딩하기" onClick={() => setPageNum(0)} />

      <Bottom type="primary" onClick={handleClickBottom}>
        다음
      </Bottom>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 73px;
  padding-bottom: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
`;

const Bottom = styled(Btn)`
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
`;
