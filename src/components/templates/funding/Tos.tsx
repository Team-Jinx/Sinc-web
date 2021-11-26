import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { BottomBtn, Header } from "src/components/molecules";
import styled, { css } from "styled-components";

interface TosProps {
  setPageNum: Dispatch<SetStateAction<number>>;
}
const Tos = ({ setPageNum }: TosProps) => {
  const [isSelected, setIsSelected] = useState({
    1: false,
    2: false,
  });
  const router = useRouter();

  return (
    <Container>
      <Header
        title="펀딩하기"
        leftIcon={
          <ArrowLeftIcon
            style={{ marginBottom: "4px" }}
            onClick={() => router.back()}
          />
        }
      />
      <DescWrap>
        <h1>정책 동의</h1>
        <p>
          {
            "펀딩 시 여러분은 단순히 공연을 예매하는 것을 넘어\n아티스트가 공연을 올리기 위한 전 과정을\n응원하고 후원하게 됩니다."
          }
        </p>
      </DescWrap>
      <TosBox
        isSelected={isSelected[1]}
        setIsSelected={(e: boolean) =>
          setIsSelected({
            ...isSelected,
            1: e,
          })
        }
        txt={
          "아티스트가 예고 없이 공연을 지연하거나\n공연 설명과 다른 공연을 진행했을 경우\n후원금 반환 신청이 가능합니다."
        }
      />
      <div style={{ height: "16px" }} />
      <TosBox
        isSelected={isSelected[2]}
        setIsSelected={(e: boolean) =>
          setIsSelected({
            ...isSelected,
            2: e,
          })
        }
        txt="단순 변심에 의한 후원금 반환은 불가합니다"
      />
      <BottomBtn
        txt="계속해서 펀딩하기"
        isAtv={isSelected[1] && isSelected[2]}
        handleClickBtn={() => isSelected[1] && isSelected[2] && setPageNum(1)}
      />
    </Container>
  );
};

export default Tos;

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

const DescWrap = styled.section`
  width: 320px;
  margin-top: 26px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    all: unset;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: var(--white);
  }

  p {
    all: unset;
    font-size: 13px;
    line-height: 150%;
    color: var(--white);
    white-space: pre-line;
  }
`;

interface TosBoxProps {
  isSelected: boolean;
  setIsSelected: (e: boolean) => void;
  txt: string;
}
const TosBox = ({ isSelected, setIsSelected, txt }: TosBoxProps) => {
  return (
    <TosBoxWrap
      isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className="select_box" />
      {txt}
    </TosBoxWrap>
  );
};

interface TosBoxWrapProps {
  isSelected: boolean;
}
const TosBoxWrap = styled.section<TosBoxWrapProps>`
  display: flex;
  flex-direction: row;
  width: 320px;
  padding: 23px 14px;
  background-color: #2b2b2b;
  font-size: 13px;
  line-height: 150%;
  color: var(--white);
  white-space: pre-line;

  .select_box {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    margin-right: 27px;
    ${({ isSelected }) =>
      isSelected
        ? css`
            background-color: var(--primary);
          `
        : css`
            background-color: var(--gray_500);
          `}
  }
`;
