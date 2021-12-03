import { TabBar } from "src/components/molecules";
import { StoryDataProps } from "src/interfaces/StoryData";
import {
  BottomSheet,
  VideoBox,
  CategoryBottomSheet,
} from "src/components/organisms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Dispatch, SetStateAction, useState } from "react";

interface VideoProps {
  storyData: StoryDataProps[];
  category: "MUSIC" | "DANCING" | "ACTING" | "OTHER" | null;
  setCategory: Dispatch<
    SetStateAction<"MUSIC" | "DANCING" | "ACTING" | "OTHER" | null>
  >;
  handleGetStory: (storyId: string, isPrev?: boolean) => Promise<void>;
  handleClickLike: (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
  type?: "story" | "notice";
  title?: string;
  artist?: string;
}
const Video = ({
  storyData,
  category,
  setCategory,
  handleGetStory,
  handleClickLike,
  type = "story",
  title = "",
  artist = "",
}: VideoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryModelOpen, setIsCategoryModelOpen] = useState(false);
  const [slideNum, setSlideNum] = useState(0);

  return (
    <>
      <Swiper
        className="video_swiper"
        initialSlide={1}
        slidesPerView={1}
        style={{
          width: "100%",
          height: "100%",
        }}
        onSlideChange={({ activeIndex }) => {
          setSlideNum(activeIndex);
          if (activeIndex === storyData.length - 1) {
            handleGetStory(storyData[activeIndex].id, false);
          }
          if (activeIndex === 0) {
            handleGetStory(storyData[activeIndex].id, true);
          }
        }}
      >
        {storyData.map((sd, idx) => {
          return (
            <SwiperSlide key={sd.id}>
              <VideoBox
                setIsOpen={setIsOpen}
                setIsCategoryModelOpen={setIsCategoryModelOpen}
                storyData={sd}
                handleClickLike={handleClickLike}
                isPlay={idx === slideNum}
                type={type}
                artist={artist}
                title={title}
              />
              {type === "story" && (
                <BottomSheet
                  PFDetailData={sd.performance}
                  ticketCount={sd.ticketCount}
                  amount={sd.amount}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              )}
            </SwiperSlide>
          );
        })}
        <CategoryBottomSheet
          category={category}
          setCategory={setCategory}
          isCategoryModelOpen={isCategoryModelOpen}
          setIsCategoryModelOpen={setIsCategoryModelOpen}
        />
      </Swiper>
      {type === "story" && <TabBar />}
    </>
  );
};

export default Video;
