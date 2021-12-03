import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import deleteQueries from "src/apis/queries/deleteQueries";
import { Loading, VideoOne } from "src/components/templates";
import states from "src/modules";
import useSWR from "swr";

// interface SWRDataProps {
//   findStoryById: StoryDataProps;
// }
const VideoPage: NextPage = () => {
  const router = useRouter();

  const userData = useRecoilValue(states.UserDataState);
  const { data: StoryData, mutate } = useSWR(
    getQueries.getStory(String(router.query.id), userData.id),
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

  return (
    <>
      {!StoryData ? (
        <Loading />
      ) : (
        <VideoOne
          storyData={StoryData.findStoryById}
          handleClickLike={handleClickLike}
        />
      )}
    </>
  );
};

export default VideoPage;
