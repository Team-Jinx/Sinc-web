import type { NextPage } from "next";
import { useRouter } from "next/router";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import { Video } from "src/components/templates";
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
    const res = await fetcher(postQueries.postCheerPF(pfId, storyId, userId));
    const newCheerCount =
      res.createUsersCheeredPerformances.perfomance.cheerCount;
    mutate({
      findStoryById: {
        ...StoryData.findStoryById,
        cheerCount: newCheerCount,
      },
    });
  };

  return (
    <Video
      storyData={StoryData.findStoryById}
      handleClickLike={handleClickLike}
    />
  );
};

export default VideoPage;

// mock-data
