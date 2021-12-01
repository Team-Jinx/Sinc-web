import { useRouter } from "next/router";
import { ArrowRight } from "src/assets/icon/common";
import { Btn } from "src/components/atoms";
import { ArtistDataProps } from "src/interfaces/ArtistData";
import styled from "styled-components";

interface ArtistInfoBoxProps {
  artistData: ArtistDataProps;
}
const ArtistInfoBox = ({ artistData }: ArtistInfoBoxProps) => {
  const router = useRouter();
  return (
    <Container>
      <div className="info">
        <img
          alt="profile_img"
          className="info__profile_img"
          src={artistData.profileUrl}
        />
        <div className="info_inner">
          <p className="info_inner__name">
            {artistData.agency + " " + artistData.name}{" "}
            <ArrowRight
              onClick={() => router.push(`/artist/${artistData.id}`)}
            />
          </p>
          <p className="info_inner__funding">
            진행한 펀딩 <b>{4}개</b>
          </p>
        </div>
      </div>
      <QnABtn type="empty" onClick={() => "question"}>
        문의하기
      </QnABtn>
    </Container>
  );
};

export default ArtistInfoBox;

const Container = styled.section`
  width: 100%;
  padding: 26px 20px 22px 20px;
  margin-bottom: 15px;
  background-color: var(--gray_900);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .info {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    &__profile_img {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      object-fit: cover;
      margin-right: 16px;
    }

    .info_inner {
      margin-bottom: 28px;
      display: flex;
      flex-direction: column;
      p {
        padding: 0;
        margin: 0;
        color: var(--white);
      }
      &__name {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
      }

      &__funding {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
`;

const QnABtn = styled(Btn)`
  width: 100%;
  height: 40px;
  border: 1px solid var(--white);
  border-radius: 4px;
  font-size: 14px;
  line-height: 17px;
  color: #f7f7f7;
`;
