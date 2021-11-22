import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Header } from "src/components/molecules";
import styled, { css } from "styled-components";

interface CheckProps {
  setPageNum: Dispatch<SetStateAction<number>>;
}
const Check = ({ setPageNum }: CheckProps) => {
  const router = useRouter();
  return (
    <Container>
      <Header title="후원 완료" onClick={() => router.push("/detail")} />
    </Container>
  );
};

export default Check;

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
