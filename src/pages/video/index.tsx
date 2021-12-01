import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import { Loading, Video } from "src/components/templates";
import { StoryDataProps } from "src/interfaces/StoryData";
import { DirectionType } from "src/interfaces/types";
import states from "src/modules";
import useSWRInfinite from "swr/infinite";

interface VideoPageProps {
  InitStoryDataList: StoryDataProps[];
}
const VideoPage = ({ InitStoryDataList }: VideoPageProps) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useRecoilState(
    states.IsClickedCheerBtnState,
  );

  // const [pageIndex, setPageIndex] = useState(0);
  const [query, setQuery] = useState<{
    field?: string;
    direction?: string;
    cursor?: string;
  }>({});
  const [direction, setDirection] = useState("");
  const [field, setField] = useState("");

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return getQueries.getRandomStory(
      query.field,
      query.direction,
      query.cursor,
    );
  };

  const [storyDataList, setStoryDataList] = useState<StoryDataProps[]>([]);

  const {
    data,
    mutate,
    size: pageIndex,
    setSize: setPageIndex,
  } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
    onSuccess: (data) => {
      console.log(data);

      setField(data[0].findStoriesByRandom.field);
      setDirection(data[0].findStoriesByRandom.direction);
      data.map((d) => {
        setStoryDataList(storyDataList.concat(d.findStoriesByRandom.data));
      });
    },
    // revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    console.log(storyDataList);
  }, [storyDataList]);

  const handleGetStory = async (storyId: string) => {
    console.log("handle");
    setQuery({
      field: field,
      direction: direction,
      cursor: storyId,
    });
    setPageIndex(pageIndex + 1);
  };

  const handleClickLike = async (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    userId?: string,
  ) => {
    await fetcher(postQueries.postCheerPF(pfId, storyId, userId));
    // mutate(
    //   {
    //     findStoryById: {
    //       ...StoryData.findStoryById,
    //       cheerCount: isClicked
    //         ? StoryData.findStoryById.cheerCount - 1
    //         : StoryData.findStoryById.cheerCount + 1,
    //     },
    //   },
    //   false,
    // );
  };

  return (
    <>
      {!storyDataList ? (
        <Loading />
      ) : (
        <Video
          // index={pageIndex}
          // setIndex={setPageIndex}
          storyData={storyDataList}
          handleGetStory={handleGetStory}
          // storyData={mockData}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          handleClickLike={handleClickLike}
        />
      )}
    </>
  );
};

export default VideoPage;

// VideoPage.getInitialProps = async () => {
//   const StoryData = await fetcher(getQueries.getRandomStory(5));

//   return { InitStoryDataList: StoryData.findStoriesByRandom };
// };

// mock-data
const mockData = [
  {
    backgroundUrl:
      "https://sinc-storage.s3.ap-northeast-2.amazonaws.com/guitar.mp4",
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
  },
  {
    backgroundUrl:
      "https://v16m.tiktokcdn.com/11b374709225ab022947cca25b64a75c/61a69b0f/video/tos/alisg/tos-alisg-pve-0037/e92eae2d105b452290207c9fc53953f3/?a=1180&br=3826&bt=1913&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&ft=wZmOpFBrkag3-I&l=202111301543340102452461050C3708DC&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=Mzw3ZWg6ZjVqOTMzODgzNEApPGdpOjg6ZGU5Nzk2Mzk3OmdhbmswcjRvMTRgLS1kLy1zc2AvYzYwNjE0MzUvNl80MC06Yw%3D%3D&vl=&vr=",
    cheerCount: 331,
    createdAt: 1637949281468,
    description: "저희 열심히 공연 연습중입니다~22",
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
  },
  {
    backgroundUrl:
      "https://v16m.tiktokcdn.com/6df2dbcb8d7b2801e1875dc1ad943695/61a6a419/video/tos/useast2a/tos-useast2a-ve-0068c004/174723ad17aa4551bee35ef4c4c5b09a/?a=1233&br=3196&bt=1598&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=wZmOpFBrkag3-I&l=20211130162206010245243100203F4317&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=and3aDo6Zjo0OTMzNzczM0ApN2dmOGRoNjw0NzM8NDM1ZGcvaGIycjRfYi9gLS1kMTZzc2EtNDMzYWAvYjAxLTRjNV46Yw%3D%3D&vl=&vr=",
    cheerCount: 331,
    createdAt: 1637949281468,
    description: "저희 열심히 공연 연습중입니다~333",
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
  },
];
