import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import { Loading, VideoOne } from "src/components/templates";
import states from "src/modules";
import useSWR from "swr";

// interface SWRDataProps {
//   findStoryById: StoryDataProps;
// }
const VideoPage: NextPage = () => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useRecoilState(
    states.IsClickedCheerBtnState,
  );

  const { data: StoryData, mutate } = useSWR(
    getQueries.getStory(String(router.query.id)),
    fetcher,
  );

  const handleClickLike = async (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => {
    await fetcher(postQueries.postCheerPF(pfId, storyId, userId));
    mutate(
      {
        findStoryById: {
          ...StoryData.findStoryById,
          cheerCount: isClicked
            ? StoryData.findStoryById.cheerCount - 1
            : StoryData.findStoryById.cheerCount + 1,
        },
      },
      false,
    );
  };

  return (
    <>
      {!StoryData ? (
        <Loading />
      ) : (
        <VideoOne
          // storyData={StoryData.findStoryById}
          storyData={mockData}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          handleClickLike={handleClickLike}
        />
      )}
    </>
  );
};

export default VideoPage;

// mock-data
const mockData = {
  backgroundUrl:
    "https://v16m.tiktokcdn.com/11b374709225ab022947cca25b64a75c/61a69b0f/video/tos/alisg/tos-alisg-pve-0037/e92eae2d105b452290207c9fc53953f3/?a=1180&br=3826&bt=1913&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&ft=wZmOpFBrkag3-I&l=202111301543340102452461050C3708DC&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=Mzw3ZWg6ZjVqOTMzODgzNEApPGdpOjg6ZGU5Nzk2Mzk3OmdhbmswcjRvMTRgLS1kLy1zc2AvYzYwNjE0MzUvNl80MC06Yw%3D%3D&vl=&vr=",
  cheerCount: 331,
  createdAt: 1637949281468,
  description: "저희 열심히 공연 연습중입니다~11",
  id: "ckwgopm7w0014lgir5fsslh5b",
  performance: {
    id: "ckwgl83eh006001ohqdy4wstx",
    artist: { agency: "서울예술대 실용음악과", name: "" },
    artistId: "ckwgkuksa005201ohecmfydb3",
    amount: 1193645,
    posterUrl:
      "https://sinc-storage.s3.ap-northeast-2.amazonaws.com/uleam_poster.png",
    place: "플랫폼 창동61 레드박스",
    title: "싱어송라이터 전공 정기공연 <울림>",
    showTime:
      "2021년 12월 10일(금) ~ 12월 12일(일)\n금 오후 8시 / 토, 일 오후 6시",
    runningTime: 120,
    price: 10000,
    description:
      "서울예대 싱어송라이터 정기공연 합니다!!\n7명의 싱어송라이터들이 다양한 곡들을 준비했으니까\n시간 되실때 꼬옥 와주세용!💃🏼🕺🏻\n✔️인어공주를 좋아하시는 분들 꼬옥🥰🧜🏻‍♀️\n✔️현장예매보다 사전예매가 쌉니다💸\n✔️자세한 내용은 서울예대 싱어송라이터 전공 페이지를 확인해주세요🙏🏻\nhttps://www.facebook.com/ullim13/\n🎤2019 울림 개봉박두🎤\n일시 : 2022. 07. 19. 금 19시\n장소 : 플랫폼 창동 61 레드박스\n공연문의 : 010-7936-1833",
    fundingStatus: "PROGRESS",
    reservationTimes: [
      { id: "ckwgmjf5j000001n447or6isz", toReserveAt: 1639141200000 },
      { id: "ckwgmjsmj001301n4y49sohl4", toReserveAt: 1639141200000 },
      { id: "ckwgmjpon000601n4c6sm3u6c", toReserveAt: 1639170000000 },
      { id: "ckwgmjzqk002001n4ua6et70i", toReserveAt: 1639227600000 },
      { id: "ckwgmkogx002701n4j94zg0a5", toReserveAt: 1639306800000 },
      { id: "ckwgmkrb4003401n4icvrwcwq", toReserveAt: 1639314000000 },
      { id: "ckwgmku42004001n4k346q40o", toReserveAt: 1639317600000 },
    ],
    toEndAt: 1637981618050,
    totalTicketCount: 117,
    cheerCount: 186,
    ticketCount: 84,
  },
  performanceId: "ckwgl83eh006001ohqdy4wstx",
};
