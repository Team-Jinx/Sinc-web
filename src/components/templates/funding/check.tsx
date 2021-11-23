import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Header } from "src/components/molecules";
import styled, { css } from "styled-components";

interface FDInfoDataProps {
  date: string;
  endDate: string;
  state: string;
  ticketNum: number;
  additionSup: number;
  totalPrice: number;
}
interface PFInfoDataProps {
  title: string;
  artist: string;
  startDate: string;
  endDate: string;
  location: string;
  runtime: number;
  ticketPrice: number;
}
interface CheckProps {
  setPageNum: Dispatch<SetStateAction<number>>;
  FDInfoData: FDInfoDataProps;
  PFInfoData: PFInfoDataProps;
  selectedDate: string;
  selectedTime: string;
}
const Check = ({
  setPageNum,
  FDInfoData,
  PFInfoData,
  selectedDate,
  selectedTime,
}: CheckProps) => {
  const router = useRouter();
  return (
    <Container>
      <Header title="후원 완료" onClick={() => router.push("/detail")} />
      <PFInfoWrap>
        <p className="artist_name">{PFInfoData.artist}</p>
        <p className="pf_name">{PFInfoData.title}</p>
        <button
          className="detail_btn"
          type="button"
          onClick={() => router.push(`/detail/${1}`)}
        >
          공연 상세 보러가기
        </button>
      </PFInfoWrap>
      <FDInfoWrap>
        <p>
          펀딩날짜 <span style={{ flex: 1 }} /> {FDInfoData.date}
        </p>
        <p>
          펀딩종료일
          <span style={{ flex: 1 }} /> {FDInfoData.endDate}
        </p>
        <p>
          펀딩상태
          <span style={{ flex: 1 }} /> {FDInfoData.state}
        </p>
        <p>
          {`(${"신한"})으로 결제가 완료되었습니다`}
          {/* <p>영수증 출력</p> */}
        </p>
      </FDInfoWrap>
      <SupInfoWrap>
        <p className="sup_info_title">후원 정보</p>
        <div className="sup_info_desc">
          <p>
            <b>공연이름</b>
          </p>
          <p>{PFInfoData.title}</p>
          <p>
            <b>아티스트 이름</b>
          </p>
          <p>{PFInfoData.artist}</p>
          <p>
            <b>공연 날짜</b>
          </p>
          <p>
            {selectedDate} {selectedTime}
          </p>
          <p>
            <b>티켓 개수</b>
          </p>
          <p>
            {FDInfoData.ticketNum}매 {PFInfoData.ticketPrice}원
          </p>
          <p>
            <b>추가후원</b>
          </p>
          <p>{FDInfoData.additionSup}원</p>
          <p>
            <b>최종 결제 금액</b>
          </p>
          <p>
            <b>{FDInfoData.totalPrice}원</b>
          </p>
        </div>
      </SupInfoWrap>
    </Container>
  );
};

export default Check;

const Container = styled.div`
  width: 100%;
  padding-top: 73px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
`;

const PFInfoWrap = styled.section`
  width: 100%;
  padding: 18px 0 26px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray_900);
  p {
    all: unset;
    box-sizing: border-box;
    width: 320px;
  }

  .artist_name {
    height: 21px;
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 150%;
    color: var(--white);
    opacity: 0.5;
  }
  .pf_name {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: var(--white);
  }
  .detail_btn {
    all: unset;
    box-sizing: border-box;
    position: absolute;
    right: 12px;
    margin-top: 10px;
    width: 113px;
    height: 37px;
    background: var(--gray_1000);
    border-radius: 7px;
    font-weight: 600;
    font-size: 13px;
    text-align: center;
    line-height: 16px;
    color: var(--white);
  }
`;

const FDInfoWrap = styled.section`
  width: 320px;
  margin-top: 43px;
  margin-bottom: 27px;
  display: flex;
  flex-direction: column;

  p {
    all: unset;
    height: 17px;
    margin-bottom: 27px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: var(--white);
  }
`;

const SupInfoWrap = styled.section`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 106px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray_900);

  .sup_info_title {
    width: 320px;
    padding-bottom: 19px;
    border-bottom: 1px solid var(--gray_300);
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: var(--white);
    text-align: center;
  }

  .sup_info_desc {
    width: 320px;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 87px auto;
    column-gap: 26.5px;
    row-gap: 16px;
    p {
      all: unset;
      height: 21px;
      font-size: 14px;
      line-height: 17px;
      color: var(--white);
    }
  }
`;
