import { Btn } from "src/components/atoms";
import { PFInfoBox } from "src/components/molecules";
import NotiList from "src/components/molecules/NotiList";
import { ArtistDataProps } from "src/interfaces/ArtistData";
import { NotiDataProps } from "src/interfaces/PFData";
import { ExtractPeriodAsStr } from "src/libs";
import styled from "styled-components";

interface ArtistProps {
  artistData: ArtistDataProps;
  NotiDatas: NotiDataProps[];
}

const Artist = ({ artistData, NotiDatas }: ArtistProps) => {
  return (
    <Container>
      <ArtistInfoWrap url={artistData.profileUrl}>
        <div className="info_inner">
          <div className="name_wrap">
            <p className="name_wrap__name">{artistData.name}</p>
            <p className="name_wrap__agency">{artistData.agency}</p>
          </div>
          <QnABtn type="empty" onClick={() => "question"}>
            문의하기
          </QnABtn>
        </div>
        <p className="info_desc">
          {"안녕하세요! 저희는 어어어디 어디어디 입니다~!"}
        </p>
      </ArtistInfoWrap>
      <FDInfoList>
        <div className="info_top">
          <InfoTitle>아티스트가 진행 중인 펀딩</InfoTitle>
          <p className="info_top__btn">더보기 &gt;</p>
        </div>
        {artistData.performances.map((p, idx) => {
          idx < 2 && (
            <PFInfoBox
              type="list"
              url={p.posterUrl}
              univName={p.artist.agency + " " + p.artist.name}
              title={p.title}
              date={ExtractPeriodAsStr(p.reservationTimes)}
              location={p.place}
              handleClick={() => ""}
            />
          );
        })}
      </FDInfoList>
      <InfoTitle style={{ padding: "0 20px" }}>
        아티스트가 업로드 한 영상
      </InfoTitle>
      <NotiList NotiDatas={NotiDatas} />
    </Container>
  );
};

export default Artist;

const Container = styled.div`
  width: 100%;
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

const InfoTitle = styled.p`
  all: unset;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: var(--white);
  margin-bottom: 24px;
`;
