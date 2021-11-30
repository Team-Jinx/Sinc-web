import { TabBar } from "src/components/molecules";
import { StoryDataProps } from "src/interfaces/StoryData";
import { SetterOrUpdater } from "recoil";
import { BottomSheet, VideoBox } from "src/components/organisms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";

interface VideoProps {
  storyData: StoryDataProps[];
  handleClickLike: (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
  isClicked: boolean;
  setIsClicked: SetterOrUpdater<boolean>;
}
const Video = ({
  storyData,
  isClicked,
  setIsClicked,
  handleClickLike,
}: VideoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slideNum, setSlideNum] = useState(0);

  useEffect(() => {
    console.log(slideNum);
  }, [slideNum]);

  return (
    <>
      <Swiper
        className="video_swiper"
        // direction="vertical"
        initialSlide={0}
        slidesPerView={1}
        style={{
          width: "100%",
          height: "100%",
        }}
        onSlideChange={({ activeIndex }) => setSlideNum(activeIndex)}
      >
        {storyData.map((sd, idx) => {
          return (
            <SwiperSlide key={sd.id}>
              <VideoBox
                setIsOpen={setIsOpen}
                storyData={sd}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                handleClickLike={handleClickLike}
                isPlay={idx === slideNum}
              />
              <BottomSheet
                PFDetailData={sd.performance}
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
