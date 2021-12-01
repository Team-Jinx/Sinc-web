import { TabBar } from "src/components/molecules";
import { StoryDataProps } from "src/interfaces/StoryData";
import { SetterOrUpdater } from "recoil";
import { BottomSheet, VideoBox } from "src/components/organisms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PFDetailDataProps } from "src/interfaces/PFData";

interface VideoProps {
  storyData: StoryDataProps[];
  // PFData: PFDetailDataProps;
  // index: number;
  // setIndex: Dispatch<SetStateAction<number>>;
  // query: {
  //   take: number;
  //   field?: string;
  //   direction?: string;
  //   cursor?: string;
  // };
  // setQuery: Dispatch<
  //   SetStateAction<{
  //     take: number;
  //     field?: string;
  //     direction?: string;
  //     cursor?: string;
  //   }>
  // >;
  handleGetStory: (storyId: string) => Promise<void>;
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
  // index,
  // setIndex,
  // PFData,
  // query,
  // setQuery,
  handleGetStory,
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
        // loop
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
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                handleClickLike={handleClickLike}
                isPlay={idx === slideNum}
              />
              {/* <BottomSheet
                PFDetailData={sd.performance}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <TabBar />
    </>
  );
};

export default Video;
