import { useRouter } from "next/router";
import { ArrowRight } from "src/assets/icon/common";
import { ArtistDataProps } from "src/interfaces/ArtistData";
import styled from "styled-components";
import { ReviewBox } from "..";

interface ArtistReviewBoxProps {
  artistData: ArtistDataProps;
  rate: number;
  comment: string;
}
const ArtistReviewBox = ({
  artistData,
  rate,
  comment,
}: ArtistReviewBoxProps) => {
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
          <p
            className="info_inner__name"
            onClick={() => router.push(`/artist/${artistData.id}`)}
          >
            {artistData.agency + " " + artistData.name} <ArrowRight />
          </p>
          <p className="info_inner__funding">
            진행한 펀딩 <b>{artistData._count?.performances}개</b>
          </p>
        </div>
      </div>
      <StyledReviewBox
        rate={rate}
        title={
          (artistData.performance && artistData.performance[0].title) || ""
        }
        comment={comment}
      />
    </Container>
  );
};

export default ArtistReviewBox;

const Container = styled.section`
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--gray_900);
  margin-bottom: 16px;

  .info {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-bottom: 1px solid var(--gray_800);
    margin-bottom: 17px;

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

const StyledReviewBox = styled(ReviewBox)`
  padding: 0;
  margin: 0;
  .comment {
    margin: 0;
  }
`;
