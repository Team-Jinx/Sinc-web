import { TabBar } from "src/components/molecules";
import { StoryDataProps } from "src/interfaces/StoryData";
import { BottomSheet, VideoBox } from "src/components/organisms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";

interface VideoProps {
  storyData: StoryDataProps[];
  handleGetStory: (storyId: string) => Promise<void>;
  handleClickLike: (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
}
const Video = ({ storyData, handleGetStory, handleClickLike }: VideoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slideNum, setSlideNum] = useState(0);

  useEffect(() => {
    console.log(slideNum);
  }, [slideNum]);

  return (
    <>
      <Swiper
        className="video_swiper"
        initialSlide={0}
        slidesPerView={1}
        style={{
          width: "100%",
          height: "100%",
        }}
        onSlideChange={({ activeIndex }) => {
          setSlideNum(activeIndex);
          if (activeIndex === storyData.length - 1) {
            handleGetStory(storyData[activeIndex].id);
          }
        }}
      >
        {storyData.map((sd, idx) => {
          return (
            <SwiperSlide key={sd.id}>
              <VideoBox
                setIsOpen={setIsOpen}
                storyData={sd}
                handleClickLike={handleClickLike}
                isPlay={idx === slideNum}
              />
              <BottomSheet
                PFDetailData={sd.performance}
                ticketCount={sd.ticketCount}
                amount={sd.amount}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <TabBar />
    </>
  );
};

export default Video;
