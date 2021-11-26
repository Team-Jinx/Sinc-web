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

interface FDInfoDataProps {
  soldTicket: number;
  leftTicket: number;
  percent: number;
  leftPeriod: number;
  totalPrice: number;
  likeNum: number;
}
interface DetailProps {
  PFDetailData: PFDetailDataProps;
  FDInfoData: FDInfoDataProps;
}
const Detail = ({ PFDetailData, FDInfoData }: DetailProps) => {
  const router = useRouter();
  const [menu, setMenu] = useState<"desc" | "noti">("desc");

  return (
    <Container>
      <Header
        title="공연 상세"
        leftIcon={
          <ArrowLeftIcon
            style={{ marginBottom: "3px" }}
            onClick={() => router.back()}
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
        date={
          "hihi"
          // PFDetailData.reservationTimes.length === 1
          //   ? `${PFDetailData.reservationTimes[0]}`
          //   : `${PFDetailData.reservationTimes[0]} ~ ${PFDetailData.reservationTimes[1]}`
        }
        location={PFDetailData.place}
      />
      <FDWrap>
        <FDInfoBox
          soldTicket={FDInfoData.soldTicket}
          leftTicket={FDInfoData.leftTicket}
          percent={FDInfoData.percent}
          leftPeriod={FDInfoData.leftPeriod}
          totalPrice={FDInfoData.totalPrice}
          likeNum={FDInfoData.likeNum}
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
      <Bottom type="primary" onClick={() => router.push("/funding")}>
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
  align-items: center;
  font-size: 14px;
  line-height: 150%;
  color: var(--white);
  p {
    all: unset;
    width: 320px;
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
  width: 320px;
  height: 40px;
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
