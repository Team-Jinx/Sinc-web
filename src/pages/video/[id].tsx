import type { NextPage } from "next";
import { useRouter } from "next/router";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import { Loading, Video } from "src/components/templates";
import useSWR from "swr";

// interface SWRDataProps {
//   findStoryById: StoryDataProps;
// }
const VideoPage: NextPage = () => {
  const router = useRouter();
  const { data: StoryData, mutate } = useSWR(
    getQueries.getStory(String(router.query.id)),
    fetcher,
  );

  const handleClickLike = async (
    pfId: string,
    storyId: string,
    userId?: string,
  ) => {
    await fetcher(postQueries.postCheerPF(pfId, storyId, userId));
    mutate(
      {
        findStoryById: {
          ...StoryData.findStoryById,
          cheerCount: StoryData.findStoryById.cheerCount + 1,
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
        <Video
          storyData={StoryData.findStoryById}
          handleClickLike={handleClickLike}
        />
      )}
    </>
  );
};

export default VideoPage;

// mock-data
