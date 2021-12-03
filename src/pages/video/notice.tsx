import { useState } from "react";
import { useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import deleteQueries from "src/apis/queries/deleteQueries";
import { Loading, Video } from "src/components/templates";
import { StoryDataProps } from "src/interfaces/StoryData";
import states from "src/modules";
import useSWRInfinite from "swr/infinite";

const NoticePage = () => {
  const userData = useRecoilValue(states.UserDataState);
  const PFDetailData = useRecoilValue(states.PFDetailDataState);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return getQueries.getNotice({
      performanceId: PFDetailData.id,
      userId: userData.id,
      limit: 5,
      offset: pageIndex * 5,
    });
  };

  const [storyDataList, setStoryDataList] = useState<StoryDataProps[]>([]);

  const { size: pageIndex, setSize: setPageIndex } = useSWRInfinite(
    getKey,
    fetcher,
    {
      initialSize: 1,
      onSuccess: (data) => {
        console.log(data);
        data.map((d) => {
          setStoryDataList(storyDataList.concat(d.findStories));
        });
      },
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const handleGetStory = async (storyId: string) => {
    console.log(storyId);
    setPageIndex(pageIndex + 1);
  };

  const handleClickLike = async (
    isClicked: boolean,
    pfId: string,
    storyId: string,
    cheerId?: string,
  ) => {
    if (isClicked) {
      await fetcher(deleteQueries.deleteCheerPF(cheerId || ""));
      setStoryDataList(
        storyDataList.map((d) => {
          if (d.id == storyId)
            return {
              ...d,
              cheerCount: d.cheerCount - 1,
              usersCheeredPerformances: [],
            };
          else return d;
        }),
      );
    } else {
      const res = await fetcher(
        postQueries.postCheerPF(pfId, storyId, userData.id),
      );
      setStoryDataList(
        storyDataList.map((d) => {
          if (d.id == storyId)
            return {
              ...d,
              cheerCount: d.cheerCount + 1,
              usersCheeredPerformances: [
                { id: res.createUsersCheeredPerformances.id },
              ],
            };
          else return d;
        }),
      );
    }
  };

  return (
    <>
      {!storyDataList ? (
        <Loading />
      ) : (
        <Video
          storyData={storyDataList}
          handleGetStory={handleGetStory}
          handleClickLike={handleClickLike}
          type="notice"
          artist={PFDetailData.artist.agency + " " + PFDetailData.artist.name}
          title={PFDetailData.title}
        />
      )}
    </>
  );
};

export default NoticePage;
