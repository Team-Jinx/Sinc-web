import { HandAtvIcon, HandIcon, MainIcon } from "src/assets/icon/common";
import { TagImg } from "src/assets/img/video";
import { Icon } from "src/components/atoms";
import { StoryDataProps } from "src/interfaces/StoryData";
import { CalDateInterval } from "src/libs";
import { format } from "friendly-numbers";
import styled from "styled-components";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useRouter } from "next/router";

interface VideoBoxProps {
  storyData: StoryDataProps;
  handleClickLike: (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isPlay: boolean;
}
const VideoBox = ({
  storyData,
  handleClickLike,
  setIsOpen,
  isPlay,
}: VideoBoxProps) => {
  const video = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      isPlay ? video.current?.play() : video.current?.pause();
    }, 100);
  }, [isPlay, video]);

  return (
    <Container tag={TagImg} onClick={() => setIsOpen(true)}>
      <MainIcon className="main_icon" />
      <VideoWrap
        src={storyData.backgroundUrl + "#t=0.5"}
        preload="metadata"
        loop
        playsInline
        controlsList="nodownload"
        ref={video}
      />
      <div className="tag">
        {storyData.performance.artist?.agency +
          storyData.performance.artist?.name}
      </div>
      <InfoWrap>
        <p className="info_txt_1">{CalDateInterval(storyData.createdAt)}일전</p>
        <p className="info_txt_2">{storyData.performance.title}</p>
        <p className="info_txt_3">{storyData.description}</p>
      </InfoWrap>
      <DetailBtn
        onClick={() => router.push(`/detail/${storyData.performanceId}`)}
        url={storyData.performance.posterUrl}
      />
      <LikeWrap>
        {storyData.usersCheeredPerformances.length !== 0 ? (
          <HandAtvIcon
            onClick={(e) => {
              e.stopPropagation();
              handleClickLike(
                true,
                storyData.performanceId,
                storyData.id,
                storyData.usersCheeredPerformances[0].id,
              );
            }}
            role="button"
          />
        ) : (
          <HandIcon
            onClick={(e) => {
              e.stopPropagation();
              handleClickLike(false, storyData.performanceId, storyData.id);
            }}
            role="button"
          />
        )}
        {format(storyData.cheerCount)}
      </LikeWrap>
    </Container>
  );
};

export default VideoBox;

interface ContainerProps {
  tag: string;
}
const Container = styled.section<ContainerProps>`
  width: 100%;
  height: 100vh;
  padding-bottom: 54px;

  .main_icon {
    position: absolute;
    z-index: 2;
    top: 42px;
    left: 18px;
  }

  .tag {
    position: absolute;
    z-index: 2;
    top: 108px;
    left: 0px;
    width: 220px;
    height: 52px;
    padding-left: 20px;
    background: url("${({ tag }) => tag}") center center / cover;
    font-weight: 600;
    font-size: 14px;
    line-height: 32px;
    color: var(--white);
  }
`;

const VideoWrap = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoWrap = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 96px;
  left: 20px;
  width: 236px;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    all: unset;
  }
  .info_txt_1 {
    font-size: 10px;
    line-height: 14px;
    color: var(--gray_200);
  }
  .info_txt_2 {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: var(--white);
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
  .info_txt_3 {
    font-size: 12px;
    line-height: 17px;
    color: var(--gray_200);
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
  }
`;

interface DetailBtnProps {
  url?: string;
}
const DetailBtn = styled(Icon)<DetailBtnProps>`
  position: absolute;
  z-index: 2;
  bottom: 165px;
  right: 20px;
  width: 43px;
  height: 43px;
  border: 1px solid var(--white);
  border-radius: 10px;
  background: url("${({ url }) => url}") center center / cover;
`;

const LikeWrap = styled(Icon)`
  position: absolute;
  z-index: 2;
  bottom: 96px;
  right: 22px;
  width: 36px;
  height: 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  line-height: 14px;
  color: var(--white);
`;
