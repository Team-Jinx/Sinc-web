import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import { Loading, Video } from "src/components/templates";
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
        <Video
          storyData={StoryData.findStoryById}
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
