import { useRouter } from "next/router";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { Btn } from "src/components/atoms";
import { PFInfoBox } from "src/components/molecules";
import NotiList from "src/components/molecules/NotiList";
import { ArtistDetailDataProps } from "src/interfaces/ArtistData";
import { NoticeDataProps } from "src/interfaces/StoryData";
import { ExtractPeriodAsStr } from "src/libs";
import styled from "styled-components";

interface ArtistProps {
  artistData: ArtistDetailDataProps;
  NotiDatas: NoticeDataProps[];
  pageIndex: number;
  setPageIndex: (size: number) => Promise<(any[] | undefined)[] | undefined>;
}

const Artist = ({
  artistData,
  NotiDatas,
  pageIndex,
  setPageIndex,
}: ArtistProps) => {
  const router = useRouter();
  return (
    <Container>
      <Header>
        <ArrowLeftIcon onClick={() => router.back()} />
      </Header>
      <ArtistInfoWrap url={artistData.profileUrl}>
        <div className="info_inner">
          <div className="name_wrap">
            <p className="name_wrap__name">{artistData.name}</p>
            <p className="name_wrap__agency">{artistData.agency}</p>
          </div>
          <QnABtn
            type="empty"
            onClick={() => window.open(artistData.inquiryLink, "blank")}
          >
            문의하기
          </QnABtn>
        </div>
        <p className="info_desc">{artistData.description}</p>
      </ArtistInfoWrap>
      <FDInfoList>
        <div className="info_top">
          <InfoTitle>아티스트가 진행한 펀딩</InfoTitle>
          <p
            className="info_top__btn"
            onClick={() => router.push(`/artist/${artistData.id}/detail`)}
          >
            더보기 &gt;
          </p>
        </div>
        {artistData.performances.map((p) => {
          return (
            <StyledPFInfoBox
              key={p.id}
              type="detail"
              url={p.posterUrl}
              univName={artistData.agency + " " + artistData.name}
              title={p.title}
              date={ExtractPeriodAsStr(p.reservationTimes)}
              location={p.place}
              handleClick={() => ""}
            />
          );
        })}
      </FDInfoList>
      <InfoTitle style={{ padding: "0px 20px", marginTop: "15px" }}>
        아티스트가 업로드 한 영상
      </InfoTitle>
      <div style={{ height: "24px" }} />
      <NotiList
        NotiDatas={NotiDatas}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
      <div style={{ height: "80px" }} />
    </Container>
  );
};

export default Artist;

const Container = styled.div`
  width: 100%;
  background-color: var(--gray_1000);
`;

const Header = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 73px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  align-items: flex-end;
  justify-items: center;
`;

interface ArtistInfoWrapProps {
  url?: string;
}
const ArtistInfoWrap = styled.section<ArtistInfoWrapProps>`
  width: 100%;
  height: 256px;
  padding: 0 20px;
  padding-top: 137px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 17.7%, #141414 81.25%),
    url(${({ url }) => url}) center center / cover;
  display: flex;
  flex-direction: column;

  .info_inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    .name_wrap {
      display: flex;
      flex-direction: column;
      &__name {
        font-size: 18px;
        line-height: 22px;
        margin: 0;
        margin-bottom: 6px;
        color: var(--white);
      }
      &__agency {
        margin: 0;
        font-size: 15px;
        line-height: 18px;
        color: var(--gray_300);
      }
    }
  }

  .info_desc {
    margin: 0;
    font-size: 15px;
    line-height: 18px;
    color: var(--gray_300);
  }
`;

const QnABtn = styled(Btn)`
  width: 70px;
  height: 32px;
  border: 1px solid var(--white);
  border-radius: 6px;
  font-size: 14px;
  line-height: 17px;
  color: #f7f7f7;
`;

const FDInfoList = styled.section`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;

  .info_top {
    margin-bottom: 29px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &__btn {
      font-size: 14px;
      line-height: 17px;
      color: var(--gray_300);
    }
  }
`;

const StyledPFInfoBox = styled(PFInfoBox)`
  padding: 0 0;
  margin-bottom: 36px;
`;

const InfoTitle = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: var(--white);
`;
