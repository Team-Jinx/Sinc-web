import { useRouter } from "next/router";
import { useState } from "react";
import { Btn } from "src/components/atoms";
import {
  FDInfoBox,
  Header,
  PFInfoBox,
  PFInfoBox2,
  TabMenu,
} from "src/components/molecules";
import { PFDetailDataProps } from "src/interfaces/PFData";
import styled from "styled-components";
import { ArrowLeftIcon, ShareIcon } from "src/assets/icon/header";
import { CalDateInterval, ExtractPeriodAsStr } from "src/libs";

interface DetailProps {
  PFDetailData: PFDetailDataProps;
  handleInitializeData: () => void;
}
const Detail = ({ PFDetailData, handleInitializeData }: DetailProps) => {
  const router = useRouter();
  const [menu, setMenu] = useState<"desc" | "noti">("desc");

  const handleClickBottom = () => {
    handleInitializeData();
    router.push("/funding");
  };

  return (
    <Container>
      <Header
        title="공연 상세"
        leftIcon={
          <ArrowLeftIcon
            style={{ marginBottom: "3px" }}
            onClick={() => router.push("/")}
          />
        }
        rightIcon={
          <ShareIcon style={{ marginRight: "20px", marginBottom: "13px" }} />
        }
      />
      <StyledPFInfoBox
        type="detail"
        url={PFDetailData.posterUrl}
        univName={PFDetailData.artist?.agency + PFDetailData.artist?.name}
        title={PFDetailData.title}
        date={ExtractPeriodAsStr(PFDetailData.reservationTimes)}
        location={PFDetailData.place}
      />
      <FDWrap>
        <FDInfoBox
          soldTicket={PFDetailData.ticketCount}
          leftTicket={PFDetailData.totalTicketCount - PFDetailData.ticketCount}
          percent={
            (PFDetailData.ticketCount / PFDetailData.totalTicketCount) * 100
          }
          leftPeriod={
            -CalDateInterval(
              PFDetailData.reservationTimes[
                PFDetailData.reservationTimes.length - 1
              ].toReserveAt,
            )
          }
          totalPrice={PFDetailData.amount}
          likeNum={PFDetailData.cheerCount}
        />
      </FDWrap>
      <PFInfoBox2
        location={PFDetailData.place}
        runtime={PFDetailData.runningTime}
        ticketPrice={PFDetailData.price}
      />
      <QnABtn type="empty" onClick={() => "question"}>
        문의하기
      </QnABtn>
      <TabMenu menu={menu} setMenu={setMenu} />
      <DescWrap>
        <p className="pf_time_title">
          <b>공연시간</b>
        </p>
        <p className="pf_time">{PFDetailData.showTime}</p>
        <img
          className="poster_img"
          alt="poster_img"
          src={PFDetailData.posterUrl}
        />
        <p className="pf_desc">{PFDetailData.description}</p>
      </DescWrap>
      <Bottom type="primary" onClick={handleClickBottom}>
        펀딩하기
      </Bottom>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  width: 100%;
  padding-top: 73px;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
`;

const StyledPFInfoBox = styled(PFInfoBox)`
  margin-top: 23px;
  margin-bottom: 56px;
`;

const FDWrap = styled.section`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1f1f1f;
`;

const DescWrap = styled.section`
  width: 100%;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  line-height: 150%;
  color: var(--white);
  p {
    all: unset;
    padding: 0 20px;
    white-space: pre-line;
  }
  .pf_time_title {
    height: 21px;
    margin-bottom: 8px;
  }
  .pf_time {
    height: 55px;
    margin-bottom: 16px;
    line-height: 21px;
  }
  .poster_img {
    width: 100%;
    margin-bottom: 32px;
  }
  .pf_desc {
    line-height: 20px;
  }
`;

const QnABtn = styled(Btn)`
  width: 380px;
  height: 40px;
  margin: 0 20px;
  margin-bottom: 24px;
  border: 1px solid var(--white);
  border-radius: 4px;
  font-size: 14px;
  line-height: 17px;
  color: #f7f7f7;
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
