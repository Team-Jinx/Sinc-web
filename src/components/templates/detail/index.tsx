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
import styled from "styled-components";

interface PFInfoDataProps {
  url?: string;
  univName: string;
  title: string;
  date: string;
  location?: string;
}

interface FDInfoDataProps {
  soldTicket: number;
  leftTicket: number;
  percent: number;
  leftPeriod: number;
  totalPrice: number;
  likeNum: number;
}
interface DetailProps {
  PFInfoData: PFInfoDataProps;
  FDInfoData: FDInfoDataProps;
  runtime: number;
  ticketPrice: number;
  startDate: string;
  endDate: string;
  startTime: string;
  pfDesc?: string;
}
const Detail = ({
  PFInfoData,
  FDInfoData,
  runtime,
  ticketPrice,
  startDate,
  endDate,
  startTime,
  pfDesc,
}: DetailProps) => {
  const router = useRouter();
  const [menu, setMenu] = useState<"desc" | "noti">("desc");

  return (
    <Container>
      <Header title="공연 상세" onClick={() => router.back()} />
      <StyledPFInfoBox
        type="detail"
        url={PFInfoData.url}
        univName={PFInfoData.univName}
        title={PFInfoData.title}
        date={PFInfoData.date}
        location={PFInfoData.location}
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
        location={PFInfoData.location}
        runtime={runtime}
        ticketPrice={ticketPrice}
      />
      <QnABtn type="empty" onClick={() => "question"}>
        문의하기
      </QnABtn>
      <TabMenu menu={menu} setMenu={setMenu} />
      <DescWrap>
        <p className="pf_time_title">
          <b>공연시간</b>
        </p>
        <p className="pf_time">
          {startDate}~{endDate}
          {"\n"} {startTime}
        </p>
        <img className="poster_img" alt="poster_img" src={PFInfoData.url} />
        <p className="pf_desc">{pfDesc}</p>
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
    line-height: 14px;
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
