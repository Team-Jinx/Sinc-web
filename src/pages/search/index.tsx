import { useState } from "react";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Search } from "src/components/templates";
import { StoryDataProps } from "src/interfaces/StoryData";
import useSWR from "swr";

const SearchPage = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [PFDataList, setPFDataList] = useState([]);
  const [StoryDataList, setStoryDataList] = useState([]);

  const { mutate: PFMutate } = useSWR(
    getQueries.getAllPF({
      keyword: "",
    }),
    fetcher,
    {
      onSuccess: (d) => {
        setPFDataList(d.findPerformances);
      },
      revalidateOnMount: false,
      revalidateIfStale: false,
    },
  );

  const { mutate: STMutate } = useSWR(
    getQueries.getNotice({ keyword: "" }),
    fetcher,
    {
      onSuccess: (d) => {
        setStoryDataList(d.findStories);
      },
      revalidateOnMount: false,
      revalidateIfStale: false,
    },
  );

  const handleSearch = async (
    keyword: string,
    category: "PERFORMANCE" | "VIDEO",
  ) => {
    setIsSearched(true);
    if (category === "PERFORMANCE") {
      PFMutate(
        fetcher(getQueries.getAllPF({ keyword })).then((d) =>
          setPFDataList(d.findPerformances),
        ),
        false,
      );
    } else if (category === "VIDEO") {
      STMutate(
        fetcher(getQueries.getNotice({ keyword })).then((d) =>
          setStoryDataList(
            d.findStories.filter((fs: StoryDataProps) => fs.videoUrl !== null),
          ),
        ),
        false,
      );
    }
  };

  return (
    <Search
      PFDataList={PFDataList}
      StoryDataList={StoryDataList}
      handleSearch={handleSearch}
      isSearched={isSearched}
    />
  );
};

export default SearchPage;
