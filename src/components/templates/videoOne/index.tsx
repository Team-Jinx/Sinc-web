import { TabBar } from "src/components/molecules";
import { StoryDataProps } from "src/interfaces/StoryData";
import { SetterOrUpdater } from "recoil";
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
  isClicked: boolean;
  setIsClicked: SetterOrUpdater<boolean>;
}
const VideoOne = ({
  storyData,
  isClicked,
  setIsClicked,
  handleClickLike,
}: VideoOneProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <VideoBox
        setIsOpen={setIsOpen}
        storyData={storyData}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        handleClickLike={handleClickLike}
        isPlay
      />
      <BottomSheet
        PFDetailData={storyData.performance}
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
