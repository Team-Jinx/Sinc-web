import { ImgBox, Tag } from "src/components/atoms";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BannerDataType } from "src/interfaces/types";

interface BannerProps {
  data: BannerDataType[];
}
const Banner = ({ data }: BannerProps) => {
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
        {data.map((d) => {
          return (
            <SwiperSlide key={d.url}>
              <StyledImgBox url={d.url}>
                <StyledTag
                  text={
                    <span style={{ fontWeight: 400 }}>
                      오늘의 <b>아티스트</b>
                    </span>
                  }
                  type="video"
                />
                <p className="banner_txt_2">{d.name}</p>
                <p className="banner_txt_3">{d.agency}</p>
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

const StyledTag = styled(Tag)`
  margin-top: 108px;
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
