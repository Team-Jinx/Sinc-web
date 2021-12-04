import { useRouter } from "next/router";
import { Btn } from "src/components/atoms";
import {
  ArtistInfoBox,
  FDInfoBox,
  Header,
  PFInfoBox,
  PFInfoBox2,
} from "src/components/molecules";
import { PFDetailDataProps } from "src/interfaces/PFData";
import styled from "styled-components";
import { ArrowLeftIcon, ShareIcon } from "src/assets/icon/header";
import { CalDateInterval, ExtractPeriodAsStr } from "src/libs";
import { DetailTab } from "src/components/organisms";
import { NoticeDataProps } from "src/interfaces/StoryData";

interface DetailProps {
  PFDetailData: PFDetailDataProps;
  handleInitializeData: () => void;
  NotiDatas: NoticeDataProps[];
  // pageIndex: number;
  // setPageIndex: (size: number) => Promise<(any[] | undefined)[] | undefined>;
}
const Detail = ({
  PFDetailData,
  handleInitializeData,
  NotiDatas,
}: // pageIndex,
// setPageIndex,
DetailProps) => {
  const router = useRouter();

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
        univName={PFDetailData.artist.agency + " " + PFDetailData.artist.name}
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
      <ArtistInfoBox artistData={PFDetailData.artist} />
      <DetailTab
        showTime={PFDetailData.showTime}
        posterUrl={PFDetailData.posterUrl}
        description={PFDetailData.description}
        NotiDatas={NotiDatas}
        // pageIndex={pageIndex}
        // setPageIndex={setPageIndex}
      />
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
  background-color: var(--gray_1000);
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
