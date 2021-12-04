import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, StoryListView } from "src/components/templates";
import { PopStoriesDataProps } from "src/interfaces/StoryData";
import states from "src/modules";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const PopularPage = () => {
  const [storyDataList, setStoryDataList] = useState<PopStoriesDataProps[]>([]);
  const userData = useRecoilValue(states.UserDataState);
  const router = useRouter();

  // const getKey = (pageIndex: number, previousPageData: any) => {
  //   console.log(pageIndex);
  //   if (previousPageData && !previousPageData.findPopularStories.length) {
  //     console.log(previousPageData);
  //     console.log("null");
  //     return null;
  //   }
  //   return getQueries.getPopStories(15, pageIndex * 15, userData.id);
  // };

  // const { size: pageIndex, setSize: setPageIndex } = useSWRInfinite(
  //   getKey,
  //   fetcher,
  //   {
  //     onSuccess: (data) => {
  //       data.map((d) => {
  //         setStoryDataList(storyDataList.concat(d.findPopularStories));
  //       });
  //     },
  //     errorRetryCount: 3,
  //     revalidateAll: true,
  //     // persistSize: true,
  //     // revalidateOnFocus: false,
  //   },
  // );

  const { data } = useSWR(
    getQueries.getPopStories({
      userId: userData.id,
      // limit: 15,
      // offset: pageIndex * 15,
    }),
    fetcher,
  );

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <StoryListView
          title="인기있는 소식"
          handleClickBack={() => router.back()}
          storyData={data.findPopularStories}
          // pageIndex={pageIndex}
          // setPageIndex={setPageIndex}
        />
      )}
    </>
  );
};

export default PopularPage;
