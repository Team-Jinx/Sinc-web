import styled from "styled-components";
import { Rating } from "@material-ui/lab";
import { StarIcon, EmptyStarIcon } from "src/assets/icon/common";

interface ReviewBoxProps {
  className?: string;
  rate: number;
  title: string;
  comment?: string;
  userName?: string;
  date?: number;
}
const ReviewBox = ({
  className,
  rate,
  title,
  comment,
  userName,
  date,
}: ReviewBoxProps) => {
  return (
    <Container className={className}>
      <Rating
        name="review_rating"
        defaultValue={rate}
        readOnly
        icon={<StarIcon style={{ width: "16px" }} />}
        emptyIcon={<EmptyStarIcon style={{ width: "16px" }} />}
      />
      <p className="title">{title}</p>
      <p className="comment">{comment}</p>
      {userName && (
        <div className="user">
          <p className="user__name">{userName}</p>
          <p className="date">{date}일 전</p>
        </div>
      )}
    </Container>
  );
};

export default ReviewBox;

const Container = styled.section`
  width: 100%;
  padding: 16px 17px;
  border-radius: 4px;
  background-color: var(--gray_900);
  margin-bottom: 16px;

  .title {
    margin: 0;
    margin-top: 7px;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: var(--white);
  }

  .comment {
    margin: 0;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 150%;
    color: var(--gray_100);
    width: 290px;
    height: 68px;
  }

  .user {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    &__name {
      margin: 0;
      margin-right: 13.5px;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      color: var(--gray_50);
    }
    .date {
      margin: 0;
      font-size: 14px;
      line-height: 150%;
      color: var(--gray_500);
    }
  }
`;

export const TotalReviewBox = () => {
  return (
    <TotalContainer>
      <Rating
        name="review_rating"
        defaultValue={4}
        readOnly
        icon={<StarIcon />}
        emptyIcon={<EmptyStarIcon />}
      />
      <div className="info_wrap">
        <p>{4} / 5 점</p>
        <p>리뷰 총 {30}개</p>
      </div>
    </TotalContainer>
  );
};

const TotalContainer = styled(Container)`
  padding-top: 11.5px;
  padding-bottom: 11.5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .info_wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    p {
      margin: 0;
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 17px;
      color: var(--gray_50);
    }
  }
`;
