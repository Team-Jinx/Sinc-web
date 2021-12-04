import { ImgBox } from "src/components/atoms";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PFDetailDataProps } from "src/interfaces/PFData";
import { CalDateInterval } from "src/libs";
import { useWindowSize } from "src/hooks";
import { useEffect } from "react";

interface BannerProps {
  data: PFDetailDataProps[];
}
const Banner = ({ data }: BannerProps) => {
  const size = useWindowSize();

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Container role="banner">
      <Swiper
        className="banner_swiper"
        modules={[Navigation, Pagination]}
        initialSlide={0}
        loop
        slidesPerView={1}
        // pagination={{ clickable: true, type: "bullets" }}
        navigation
        style={{
          width: "100%",
          height: "100%",
        }}
        autoplay={{ delay: 3000 }}
      >
        {data.map((d) => {
          return (
            <SwiperSlide key={d.id}>
              <StyledImgBox url={d.posterUrl}>
                <InnerInfoWrap>
                  <img
                    className="poster_img"
                    alt="poster_img"
                    src={d.posterUrl}
                  />
                  <p className="banner_txt_2">{d.title}</p>
                  <p className="banner_txt_3">{d.artist.agency}</p>
                  <TxtWrap>
                    <p className="white_txt">
                      <span
                        style={{ fontSize: "18px", color: "var(--primary)" }}
                      >
                        {((d.ticketCount / d.totalTicketCount) * 100).toFixed(
                          2,
                        )}
                        %
                      </span>{" "}
                      달성
                    </p>
                    <p>
                      남은 펀딩 기간{" "}
                      <b style={{ fontWeight: 600 }}>
                        {
                          -CalDateInterval(
                            d.reservationTimes[d.reservationTimes?.length - 1]
                              ?.toReserveAt,
                          )
                        }
                        일
                      </b>
                    </p>
                  </TxtWrap>
                  <Bar
                    percent={Number(
                      ((d.ticketCount / d.totalTicketCount) * 100).toFixed(2),
                    )}
                    width={size.width || 320}
                  >
                    <div className="inner_bar" />
                  </Bar>
                </InnerInfoWrap>
              </StyledImgBox>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>
        {`
          .swiper-button-next:after {
            font-size: 16px;
            color: var(--white);
          }
          .swiper-button-prev:after {
            font-size: 16px;
            color: var(--white);
          }
        `}
      </style>
    </Container>
  );
};

export default Banner;

const Container = styled.section`
  width: 100%;
`;

const StyledImgBox = styled(ImgBox)`
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${({ url }) => url}) center center / cover;
`;

const InnerInfoWrap = styled.article`
  width: 100%;
  height: 100%;
  padding: 99px 42px 37px;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(50px);

  .poster_img {
    width: 236px;
    height: 312px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 24px;
  }

  .banner_txt_2 {
    margin: 0;
    width: 100%;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: var(--white);
    margin-bottom: 12px;
  }

  .banner_txt_3 {
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
    font-size: 15px;
    line-height: 18px;
    color: var(--gray_200);
  }
`;

const TxtWrap = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: var(--gray_200);

  p {
    all: unset;
  }
  .white_txt {
    color: var(--white);
  }
`;

interface BarProps {
  percent: number;
  width: number;
}
const Bar = styled.div<BarProps>`
  height: 8px;
  width: 100%;
  background: var(--gray_600);
  border-radius: 2px;
  margin-bottom: 11px;

  .inner_bar {
    position: relative;
    z-index: 2;
    height: 8px;
    width: ${({ percent, width }) => (percent * (width - 40)) / 100}px;
    background: var(--primary);
    border-radius: ${({ percent }) =>
      percent === 100 ? "2px" : "2px 0px 0px 2px"};
  }
`;
