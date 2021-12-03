import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries, postQueries } from "src/apis/queries";
import deleteQueries from "src/apis/queries/deleteQueries";
import { Loading, Video } from "src/components/templates";
import { StoryDataProps } from "src/interfaces/StoryData";
import { CategoryType } from "src/interfaces/types";
import states from "src/modules";
import useSWRInfinite from "swr/infinite";

// interface VideoPageProps {
//   InitStoryDataList: StoryDataProps[];
// }
const VideoPage = () => {
  const userData = useRecoilValue(states.UserDataState);

  // const [pageIndex, setPageIndex] = useState(0);
  const [query, setQuery] = useState<{
    field?: string;
    direction?: string;
    cursor?: string;
  }>({});
  const [direction, setDirection] = useState("");
  const [field, setField] = useState("");
  const [category, setCategory] = useRecoilState(states.StoryCategoryState);

  const getKey = (pageIndex: number, previousPageData: any) => {
    console.log(pageIndex);
    if (previousPageData && !previousPageData.length) return null;
    return getQueries.getRandomStory(
      userData.id,
      query.field,
      query.direction,
      query.cursor,
      category,
    );
  };

  const [storyDataList, setStoryDataList] = useState<StoryDataProps[]>([]);

  const { size: pageIndex, setSize: setPageIndex } = useSWRInfinite(
    getKey,
    fetcher,
    {
      initialSize: 1,
      onSuccess: (data) => {
        console.log(data);

        setField(data[0].findStoriesByRandom.field);
        setDirection(data[0].findStoriesByRandom.direction);
        data.map((d) => {
          setStoryDataList(storyDataList.concat(d.findStoriesByRandom.data));
        });
      },
      persistSize: false,
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const handleGetStory = async (storyId: string) => {
    console.log("handle");
    setQuery({
      field: field,
      direction: direction,
      cursor: storyId,
    });
    setPageIndex(pageIndex + 1);
  };

  const handleChangeCategory = (category: CategoryType | undefined) => {
    setStoryDataList([]);
    setCategory(category);
    // window.location.reload();
  };

  useEffect(() => {
    console.log(storyDataList);
  }, [storyDataList]);

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
          category={category}
          handleChangeCategory={handleChangeCategory}
          storyData={storyDataList}
          handleGetStory={handleGetStory}
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
