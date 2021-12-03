import { TabBar } from "src/components/molecules";
import { StoryDataProps } from "src/interfaces/StoryData";
import { BottomSheet, VideoBox } from "src/components/organisms";
import { useState } from "react";
import styled from "styled-components";

interface VideoOneProps {
  storyData: StoryDataProps;
  handleClickLike: (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
}
const VideoOne = ({ storyData, handleClickLike }: VideoOneProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <VideoBox
        setIsOpen={setIsOpen}
        storyData={storyData}
        handleClickLike={handleClickLike}
        isPlay
      />
      <BottomSheet
        PFDetailData={storyData.performance}
        ticketCount={storyData.ticketCount}
        amount={storyData.amount}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <TabBar />
    </Container>
  );
};

export default VideoOne;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
`;
