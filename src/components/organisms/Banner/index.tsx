import { ImgBox } from "src/components/atoms";
import styled from "styled-components";

interface BannerProps {
  url?: string;
}
const Banner = ({ url }: BannerProps) => {
  return (
    <Container>
      <StyledImgBox url={url}>
        <p className="banner_txt_1">
          오늘의 <b>아티스트</b>
        </p>
        <p className="banner_txt_2">어쩌고 대학교 어쩌고 동아리</p>
        <p className="banner_txt_3">여기에는 소속이 들어가지롱</p>
      </StyledImgBox>
    </Container>
  );
};

export default Banner;

const Container = styled.section`
  width: 100%;
`;

const StyledImgBox = styled(ImgBox)`
  width: 100%;
  height: 386px;
  display: flex;
  flex-direction: column;

  p {
    all: unset;
    box-sizing: border-box;
  }
  .banner_txt_1 {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    width: 154px;
    height: 32px;
    margin-top: 108px;
    padding-left: 18px;
    background-color: #141414;
    font-size: 17px;
    line-height: 32px;
    color: var(--white);
  }

  .banner_txt_2 {
    margin-top: 148px;
    margin-bottom: 4px;
    padding-left: 20px;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: var(--white);
  }

  .banner_txt_3 {
    padding-left: 20px;
    font-size: 15px;
    line-height: 18px;
    color: var(--gray_300);
  }
`;
