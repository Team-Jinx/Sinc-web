import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import deleteQueries from "src/apis/queries/deleteQueries";
import { Loading, VideoOne } from "src/components/templates";
import states from "src/modules";
import useSWR from "swr";

// interface SWRDataProps {
//   findStoryById: StoryDataProps;
// }
const VideoDetailPage: NextPage = () => {
  const router = useRouter();

  const userData = useRecoilValue(states.UserDataState);
  const setPFDetailData = useSetRecoilState(states.PFDetailDataState);

  // 유저가 선택한 데이터
  const setPageNum = useSetRecoilState(states.PageNumState);
  const setTicketNum = useSetRecoilState(states.TicketNumState);
  const setAdditionalSup = useSetRecoilState(states.AdditionalSupState);
  const setSelectDateTime = useSetRecoilState(states.SelectDateTimeState);

  const { data: StoryData, mutate } = useSWR(
    getQueries.getStory({ id: String(router.query.id), userId: userData.id }),
    fetcher,
  );

  const handleClickLike = async (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    cheerId?: string,
  ) => {
    if (isClicked) {
      await fetcher(deleteQueries.deleteCheerPF(cheerId || ""));
      mutate(
        {
          findStoryById: {
            ...StoryData.findStoryById,
            cheerCount: StoryData.findStoryById.cheerCount - 1,
            usersCheeredPerformances: [],
          },
        },
        false,
      );
    } else {
      const res = await fetcher(
        postQueries.postCheerPF(pfId, storyId, userData.id),
      );
      mutate(
        {
          findStoryById: {
            ...StoryData.findStoryById,
            cheerCount: StoryData.findStoryById.cheerCount + 1,
            usersCheeredPerformances: [
              { id: res.createUsersCheeredPerformances.id },
            ],
          },
        },
        false,
      );
    }
  };

  // 유저가 선택한 데이터 초기화
  const handleInitializeData = () => {
    setPageNum(0);
    setTicketNum(0);
    setAdditionalSup(undefined);
    setSelectDateTime({
      id: "",
      date: "",
      time: "",
    });
  };

  const handleClickFunding = async (pfId: string) => {
    const res = await fetcher(getQueries.getPF(pfId));
    handleInitializeData();
    setPFDetailData(res.findPerformanceById);
    router.push("/funding");
  };

  return (
    <>
      {!StoryData ? (
        <Loading />
      ) : (
        <VideoOne
          storyData={StoryData.findStoryById}
          handleClickLike={handleClickLike}
          handleClickFunding={handleClickFunding}
        />
      )}
    </>
  );
};

export default VideoDetailPage;
