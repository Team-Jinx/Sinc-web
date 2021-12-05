import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
  const router = useRouter();

  const userData = useRecoilValue(states.UserDataState);
  const setPFDetailData = useSetRecoilState(states.PFDetailDataState);
  // 유저가 선택한 데이터
  const setPageNum = useSetRecoilState(states.PageNumState);
  const setTicketNum = useSetRecoilState(states.TicketNumState);
  const setAdditionalSup = useSetRecoilState(states.AdditionalSupState);
  const setSelectDateTime = useSetRecoilState(states.SelectDateTimeState);

  // const [pageIndex, setPageIndex] = useState(0);
  const [query, setQuery] = useState<{
    field?: string;
    direction?: string;
    cursor?: string;
  }>({});

  const [direction, setDirection] = useState("");
  const [field, setField] = useState("");
  const [category, setCategory] = useState<CategoryType | undefined>(undefined);

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
          handleClickFunding={handleClickFunding}
        />
      )}
    </>
  );
};

export default VideoPage;
