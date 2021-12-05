import { Dispatch, SetStateAction, useEffect } from "react";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { BtnMinusIcon, BtnPlusIcon } from "src/assets/icon/funding";
import { Icon } from "src/components/atoms";
import {
  BottomBtn,
  Header,
  PFInfoBox2,
  TimeBtn,
} from "src/components/molecules";
import { PFDetailDataProps } from "src/interfaces/PFData";
import styled from "styled-components";
import { ExtractPeriodAsNum, ExtractPeriodAsStr, ExtractTimes } from "src/libs";

interface dateTimeProps {
  id: string;
  date: string;
  time: string;
}

interface MainProps {
  setPageNum: Dispatch<SetStateAction<number>>;
  ticketNum: number;
  setTicketNum: Dispatch<SetStateAction<number>>;
  additionalSup: number | undefined;
  setAdditionalSup: Dispatch<SetStateAction<number | undefined>>;
  PFDetailData: PFDetailDataProps;
  selectDateTime: dateTimeProps;
  setSelectDateTime: Dispatch<SetStateAction<dateTimeProps>>;
  handlePostUserBoughtPF: (
    amount: number,
    additionalSup: number,
    pfId: string,
    rvtId: string,
    ticketNum: number,
  ) => Promise<void>;
}
const Main = ({
  setPageNum,
  ticketNum,
  setTicketNum,
  additionalSup,
  setAdditionalSup,
  PFDetailData,
  selectDateTime,
  setSelectDateTime,
  handlePostUserBoughtPF,
}: MainProps) => {
  const handleClickBottom = async () => {
    if (selectDateTime.date !== "" && selectDateTime.time !== "") {
      handlePostUserBoughtPF(
        additionalSup
          ? ticketNum * PFDetailData.price + additionalSup
          : ticketNum * PFDetailData.price,
        additionalSup || 0,
        PFDetailData.id,
        selectDateTime.id,
        ticketNum,
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Header
        title="펀딩하기"
        leftIcon={
          <ArrowLeftIcon
            style={{ marginBottom: "4px" }}
            onClick={() => setPageNum(0)}
          />
        }
      />
      <PFInfoWrap>
        <p className="artist_name">
          {PFDetailData.artist.agency + PFDetailData.artist.name}
        </p>
        <p className="pf_name">{PFDetailData.title}</p>
      </PFInfoWrap>
      <PFDateWrap>
        <p>
          <b>공연 날짜</b>
        </p>
        <p>{ExtractPeriodAsStr(PFDetailData.reservationTimes)}</p>
      </PFDateWrap>
      <DateSelectWrap>
        <div className="date_selector_inner_wrap">
          <p className="date_selector_txt">
            <b>날짜 선택</b>
          </p>
          <input
            className="date_selector"
            type="date"
            onChange={(e) =>
              setSelectDateTime({
                ...selectDateTime,
                date: e.target.value,
              })
            }
            min={ExtractPeriodAsNum(PFDetailData.reservationTimes).minD}
            max={ExtractPeriodAsNum(PFDetailData.reservationTimes).maxD}
          />
        </div>
        <div className="date_selector_inner_wrap">
          <p className="date_selector_txt">
            <b>시간 선택</b>
          </p>
          {selectDateTime.date === "" && (
            <p className="date_selector_txt" style={{ opacity: 0.68 }}>
              날짜를 우선 선택해주세요
            </p>
          )}
        </div>
        {selectDateTime.date !== "" && (
          <TimeBtn
            data={
              ExtractTimes(
                selectDateTime.date,
                PFDetailData.reservationTimes,
              ) || []
            }
            value={selectDateTime.time}
            setValue={(e) =>
              setSelectDateTime({
                ...selectDateTime,
                id: e.id,
                time: e.time,
              })
            }
          />
        )}
      </DateSelectWrap>
      <StyledPFInfoBox2
        location={PFDetailData.place}
        runtime={PFDetailData.runningTime}
        ticketPrice={PFDetailData.price}
      />
      <TicketNumSelectWrap>
        <div className="btn_wrap">
          <Icon onClick={() => ticketNum !== 0 && setTicketNum(ticketNum - 1)}>
            <BtnMinusIcon />
          </Icon>
          {`${ticketNum}매`}
          <Icon
            onClick={() =>
              PFDetailData.totalTicketCount - PFDetailData.ticketCount >
                ticketNum && setTicketNum(ticketNum + 1)
            }
          >
            <BtnPlusIcon />
          </Icon>
        </div>
      </TicketNumSelectWrap>
      <AdditionSupWrap>
        <p className="addition_sup_title">추가 후원</p>
        <p className="addition_sup_desc">응원하는 만큼 후원해주세요</p>
        <input
          className="addition_sup_input"
          placeholder="얼마나 후원할까요?"
          type="number"
          value={additionalSup === 0 ? undefined : additionalSup}
          onChange={(e) =>
            setAdditionalSup(
              Number(e.target.value) === 0 ? undefined : Number(e.target.value),
            )
          }
        />
      </AdditionSupWrap>
      <PriceInfoWrap>
        <p>
          <b>티켓 가격</b>
        </p>
        <p className="price_txt">{PFDetailData.price.toLocaleString()}원</p>
        <p>
          <b>추가 후원 가격</b>
        </p>
        <p className="price_txt">
          {additionalSup ? additionalSup.toLocaleString() : 0}원
        </p>
        <p>
          <b>최종결제금액</b>
        </p>
        <p className="price_txt--big">
          <b>
            {additionalSup
              ? (
                  PFDetailData.price * ticketNum +
                  additionalSup
                ).toLocaleString()
              : (PFDetailData.price * ticketNum).toLocaleString()}
            원
          </b>
        </p>
      </PriceInfoWrap>
      <BottomBtn
        txt="다음"
        isAtv={
          selectDateTime.date !== "" &&
          selectDateTime.time !== "" &&
          ticketNum !== 0
        }
        handleClickBtn={handleClickBottom}
      />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100%;
  padding: 73px 20px 106px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray_1000);
`;

const PFInfoWrap = styled.section`
  position: absolute;
  z-index: 2;
  width: 100%;
  padding: 10px 0 12px 0;
  margin-bottom: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray_900);
  p {
    all: unset;
    box-sizing: border-box;
  }

  .artist_name {
    height: 21px;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 150%;
    color: var(--white);
  }
  .pf_name {
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    color: var(--white);
  }
`;

const PFDateWrap = styled.div`
  width: 100%;
  padding: 0 4px;
  margin-top: 92px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 66px auto;
  column-gap: 45px;
  align-items: center;

  p {
    all: unset;
    font-size: 14px;
    line-height: 150%;
    color: var(--gray_50);
  }
`;

const DateSelectWrap = styled.section`
  width: 100%;
  padding: 15px 20px 18px 20px;
  background: #1f1f1f;
  border-radius: 4px;
  .date_selector_inner_wrap {
    display: grid;
    grid-template-columns: 59px auto;
    column-gap: 52px;
    align-items: center;
    .date_selector_txt {
      color: var(--white);
      font-weight: 500;
      font-size: 12px;
      line-height: 150%;
    }
    .date_selector {
      width: 140px;
      height: 28px;
      padding-left: 5px;
      background: #141414;
      border: 1px solid var(--gray_100);
      border-radius: 4px;
      font-size: 14px;
      line-height: 150%;
      color: var(--white);
      &::placeholder {
        font-size: 13px;
        line-height: 150%;
        color: var(--gray_50);
      }
      &:focus {
        outline: none;
      }
      ::-webkit-calendar-picker-indicator {
        color: var(--white);
      }
    }
  }
`;

const StyledPFInfoBox2 = styled(PFInfoBox2)`
  padding: 24px 4px;
`;

const TicketNumSelectWrap = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 24px;
  background: #1f1f1f;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn_wrap {
    width: 115px;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: var(--white);
  }
`;

const AdditionSupWrap = styled.section`
  width: 100%;
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    all: unset;
  }
  .addition_sup_title {
    width: 100%;
    height: 21px;
    margin-bottom: 3px;
    font-size: 14px;
    font-weight: 700;
    line-height: 150%;
    color: var(--white);
  }
  .addition_sup_desc {
    width: 100%;
    height: 21px;
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 150%;
    color: var(--white);
    opacity: 0.68;
  }
  .addition_sup_input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    border: 1px solid var(--gray_100);
    border-radius: 4px;
    background-color: var(--black);
    font-size: 14px;
    text-align: end;
    line-height: 150%;
    color: var(--white);
    &::placeholder {
      font-size: 14px;
      text-align: end;
      line-height: 150%;
      color: var(--gray_100);
      opacity: 0.5;
    }
    &:focus {
      outline: none;
    }
  }
`;

const PriceInfoWrap = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 21px 21px 56px;
  row-gap: 16px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 150%;
  color: var(--white);

  .price_txt {
    text-align: end;
  }
  .price_txt--big {
    text-align: end;
    font-size: 24px;
    line-height: 150%;
  }
`;
