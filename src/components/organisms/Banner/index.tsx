import { ImgBox } from "src/components/atoms";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TagImg } from "src/assets/img/video";

interface BannerProps {
  urls: string[];
}
const Banner = ({ urls }: BannerProps) => {
  return (
    <Container role="banner">
      <Swiper
        className="banner_swiper"
        modules={[Navigation, Pagination]}
        initialSlide={0}
        loop
        slidesPerView={1}
        pagination={{ clickable: true, type: "bullets" }}
        navigation
        style={{
          width: "100%",
          height: "100%",
        }}
        autoplay={{ delay: 3000 }}
      >
        {urls.map((url) => {
          return (
            <SwiperSlide key={url}>
              <StyledImgBox url={url} src={TagImg}>
                <div className="banner_txt_1">
                  오늘의 <b>아티스트</b>
                </div>
                <p className="banner_txt_2">어쩌고 대학교 어쩌고 동아리</p>
                <p className="banner_txt_3">여기에는 소속이 들어가지롱</p>
              </StyledImgBox>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>
        {`
          .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            border-radius: 3px;
            background-color: var(--white);
          }
          .swiper-button-next:after {
            font-size: 16px;
            color: var(--white);
          }
          .swiper-button-prev:after {
            font-size: 16px;
            color: var(--white);
          }
          .swiper-horizontal > .swiper-pagination-bullets,
          .swiper-pagination-bullets.swiper-pagination-horizontal,
          .swiper-pagination-custom,
          .swiper-pagination-fraction {
            bottom: 24px;
          }
        `}
      </style>
    </Container>
  );
};

export default Banner;

const Container = styled.section`
  width: 100%;
  height: 386px;
`;

interface ImgBoxProps {
  src: string;
}
const StyledImgBox = styled(ImgBox)<ImgBoxProps>`
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
    width: 175px;
    height: 40px;
    margin-top: 108px;
    padding-left: 18px;
    background-color: #141414;
    font-size: 16px;
    line-height: 30px;
    color: var(--white);
    background: url(${({ src }) => src}) center center / cover;
  }

  .banner_txt_2 {
    margin-top: 124px;
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
