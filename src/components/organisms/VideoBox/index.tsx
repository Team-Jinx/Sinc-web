import {
  FilterIcon,
  HandAtvIcon,
  HandIcon,
  MainIcon,
} from "src/assets/icon/common";
import { Icon, Tag } from "src/components/atoms";
import { StoryDataProps } from "src/interfaces/StoryData";
import { CalDateInterval } from "src/libs";
import { format } from "friendly-numbers";
import styled from "styled-components";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { DoubleArrowRight } from "src/assets/icon/video";

interface VideoBoxProps {
  storyData: StoryDataProps;
  handleClickLike: (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => Promise<void>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsCategoryModelOpen?: Dispatch<SetStateAction<boolean>>;
  isPlay: boolean;
  type?: "story" | "notice";
  title?: string;
  artist?: string;
  isOne?: boolean;
  isFirst?: boolean;
}
const VideoBox = ({
  storyData,
  handleClickLike,
  setIsCategoryModelOpen,
  setIsOpen,
  isPlay,
  type = "story",
  title = "",
  artist = "",
  isOne = false,
  isFirst = false,
}: VideoBoxProps) => {
  const video = useRef<HTMLVideoElement>(null);

  const [isShow, setIsShow] = useState(true);

  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      isPlay ? video.current?.play() : video.current?.pause();
    }, 200);
  }, [isPlay, video]);

  return (
    <Container onClick={() => setIsOpen(true)} type={type}>
      {!isOne && isFirst && isShow && (
        <FirstWrap
          onClick={(e) => {
            e.stopPropagation();
            setIsShow(false);
          }}
        >
          <div className="artist_btn" />
          <p className="artist_txt">
            {"배너를 눌러 아티스트에게 남긴\n리뷰를 확인해보세요"}
          </p>
          <p className="slide_txt">
            <b>옆으로 넘겨</b> 영상들을 확인해보세요
          </p>
          <div className="bottom_sheet" />
          <p className="bottom_txt">
            {"영상 영역을 눌러\n이 영상의 펀딩에 참여해보세요"}
          </p>
          <DoubleArrowRight className="arrow_icon" />
        </FirstWrap>
      )}
      {type === "story" && (
        <>
          <MainIcon className="main_icon" />
          {(type !== "story" || !isOne) && (
            <FilterIcon
              className="filter_icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsCategoryModelOpen && setIsCategoryModelOpen(true);
              }}
            />
          )}
        </>
      )}
      {type === "notice" && (
        <Header>
          <ArrowLeftIcon onClick={() => router.back()} />
          새소식
        </Header>
      )}
      {storyData.videoUrl !== null && (
        <VideoWrap
          src={storyData.videoUrl + "#t=0.5"}
          preload="metadata"
          loop
          playsInline
          controlsList="nodownload"
          ref={video}
        />
      )}
      {storyData.imageUrl !== null && (
        <ImgWrap url={storyData.imageUrl || ""} />
      )}
      <StyledTag
        text={
          storyData.performance
            ? storyData.performance.artist?.agency +
              " " +
              storyData.performance.artist?.name
            : artist
        }
        type="video"
        onClick={(e) => {
          type === "story" && e.stopPropagation();
          type === "story" &&
            router.push(`/artist/${storyData.performance.artistId}`);
        }}
      />
      <InfoWrap type={type}>
        <p className="info_txt_1">{CalDateInterval(storyData.createdAt)}일전</p>
        <p className="info_txt_2">
          {storyData.performance ? storyData.performance.title : title}
        </p>
        <p className="info_txt_3">{storyData.description}</p>
      </InfoWrap>
      {type === "story" && (
        <DetailBtn
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/detail/${storyData.performanceId}`);
          }}
          url={storyData.performance.posterUrl}
        />
      )}
      <LikeWrap Type={type}>
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

const FirstWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.6);

  .artist_btn {
    position: fixed;
    width: 270px;
    height: 56.33px;
    left: -14.94px;
    top: 93.92px;
    border: 1px dashed var(--white);
    box-sizing: border-box;
    border-radius: 4px;
  }
  .artist_txt {
    font-size: 14px;
    line-height: 20px;
    color: var(--white);
    /* width: px; */
    left: 27.62px;
    top: 175px;
    white-space: pre-wrap;
  }

  p {
    position: fixed;
    margin: 0;
    top: 43%;
    transform: translateY(-43%);
    right: 20px;
    font-size: 18px;
    line-height: 22px;
    color: var(--white);
  }

  .arrow_icon {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: -5px;
  }

  .bottom_sheet {
    position: fixed;
    width: 50px;
    height: 50px;
    left: 44.56px;
    top: 512.9px;
    border: 1px dashed var(--white);
    border-radius: 25px;
  }

  .bottom_txt {
    position: fixed;
    width: 190px;
    height: 40px;
    left: 104.95px;
    top: 533.65px;

    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
  }
`;

interface ContainerProps {
  type: "story" | "notice";
}
const Container = styled.section<ContainerProps>`
  width: 100%;
  height: 100vh;
  padding-bottom: ${({ type }) => (type === "story" ? "54px" : "0")};

  .main_icon {
    position: absolute;
    z-index: 2;
    top: 42px;
    left: 18px;
  }

  .filter_icon {
    position: absolute;
    z-index: 4;
    top: 36px;
    right: 11px;
  }
`;

const Header = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 73px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  align-items: flex-end;
  justify-items: center;
  font-weight: 500;
  font-size: 15.36px;
  line-height: 130%;
  color: var(--white);
`;

const StyledTag = styled(Tag)`
  position: absolute;
  z-index: 2;
  top: 108px;
`;

const VideoWrap = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface ImgWrapProps {
  url: string;
}
const ImgWrap = styled.div<ImgWrapProps>`
  width: 100%;
  height: 100%;
  background: url("${({ url }) => url}") center center / cover;
`;

interface InfoWrapProps {
  type: "story" | "notice";
}
const InfoWrap = styled.div<InfoWrapProps>`
  position: absolute;
  z-index: 2;
  bottom: ${({ type }) => (type === "story" ? "96px" : "42px")};
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

interface LikeWrapProps {
  Type: "story" | "notice";
}
const LikeWrap = styled(Icon)<LikeWrapProps>`
  position: absolute;
  z-index: 2;
  bottom: ${({ Type }) => (Type === "story" ? "96px" : "42px")};
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
