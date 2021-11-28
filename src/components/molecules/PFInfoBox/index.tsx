import { MapPinIcon } from "src/assets/icon/detail";
import styled, { css } from "styled-components";

interface PFInfoBoxProps {
  className?: string;
  type: "list" | "detail";
  url?: string;
  pfNum?: number;
  univName: string;
  title: string;
  date: string;
  location?: string;
  handleClick?: () => void;
}
const PFInfoBox = ({
  className,
  type,
  url,
  pfNum,
  univName,
  title,
  date,
  location,
  handleClick,
}: PFInfoBoxProps) => {
  return (
    <Container className={className} onClick={handleClick && handleClick}>
      {type === "list" && <p className="pf_number">{pfNum}</p>}
      <PosterImg alt="poster_img" src={url} type={type} />
      <InfoWrap type={type}>
        <p className="univ_name">{univName}</p>
        <p className="title">{title}</p>
        <p className="date">{date}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            left: "-3px",
          }}
        >
          <MapPinIcon /> <p className="location">{location}</p>
        </div>
      </InfoWrap>
    </Container>
  );
};

export default PFInfoBox;

const Container = styled.section`
  width: 100%;
  padding: 0 20px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  p {
    all: unset;
    box-sizing: border-box;
  }
  .pf_number {
    width: 7px;
    height: 24px;
    margin-right: 21px;
    font-weight: 200;
    font-size: 20px;
    line-height: 24px;
    color: var(--white);
  }
`;

interface PosterImgProps {
  type: "list" | "detail";
}
const PosterImg = styled.img<PosterImgProps>`
  border-radius: 0.4rem;
  ${({ type }) =>
    type === "list"
      ? css`
          width: 88px;
          height: 122px
          margin-right: 16px;
        `
      : css`
          width: 99px;
          height: 136px;
          margin-right: 24px;
        `}
`;

interface InfoWrapProps {
  type: "list" | "detail";
}
const InfoWrap = styled.div<InfoWrapProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    all: unset;
  }
  .univ_name {
    line-height: 140%;
    margin-bottom: 0.4rem;
    font-weight: normal;
    font-size: ${({ type }) => (type === "list" ? " 1.2rem" : "1.4rem")};
    color: var(--gray_100);
  }

  .title {
    font-weight: 600;
    ${({ type }) =>
      type === "list"
        ? css`
            margin-bottom: 2.4rem;
            font-size: 1.6rem;
            line-height: 1.9rem;
          `
        : css`
            margin-bottom: 1.9rem;
            font-size: 1.7rem;
            line-height: 2.2rem;
          `};
    color: var(--white);
  }

  .date {
    height: 20px;
    margin-bottom: 3px;
    line-height: 140%;
    font-weight: 300;
    font-size: ${({ type }) => (type === "list" ? " 1.4rem" : "1.3rem")};
    color: var(--gray_100);
  }

  .location {
    font-size: 1.2rem;
    line-height: 140%;
    color: var(--gray_400);
  }
`;
