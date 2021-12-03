import router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, StoryListView } from "src/components/templates";
import { PopStoriesDataProps } from "src/interfaces/StoryData";
import states from "src/modules";
import useSWRInfinite from "swr/infinite";

const MYFundingPage = () => {
  const userData = useRecoilValue(states.UserDataState);

  // 업로드 영상 데이터
  const [StoryList, setStoryList] = useState<PopStoriesDataProps[]>([]);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (
      previousPageData &&
      !previousPageData.findUsersCheeredPerformances.length
    ) {
      return null;
    }
    return getQueries.getUserCheeredPF(userData.id, 15, pageIndex * 15);
  };
  const {
    data,
    mutate,
    size: pageIndex,
    setSize: setPageIndex,
  } = useSWRInfinite(getKey, fetcher, {
    onSuccess: (data) => {
      data.map((d) => {
        setStoryList(
          StoryList.concat(
            d.findUsersCheeredPerformances.map((fcp) => fcp.story),
          ),
        );
      });
    },
    errorRetryCount: 3,
    revalidateAll: true,
    // persistSize: true,
    // revalidateOnFocus: false,
  });

  useEffect(() => {
    console.log(StoryList);
  }, [StoryList]);

  return (
    <>
      {data ? (
        <StoryListView
          title="응원 내역"
          handleClickBack={() => router.back()}
          storyData={StoryList}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MYFundingPage;
