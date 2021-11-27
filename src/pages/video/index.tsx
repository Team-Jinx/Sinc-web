import { useEffect } from "react";
import { useRouter } from "next/router";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { StoryDataProps } from "src/interfaces/StoryData";
import { Loading } from "src/components/templates";

interface VideoPageProps {
  StoryData: StoryDataProps;
}
const VideoPage = ({ StoryData }: VideoPageProps) => {
  const router = useRouter();
  useEffect(() => {
    StoryData && router.push(`/video/${StoryData.id}`);
  }, [StoryData]);
  return <Loading />;
};

export default VideoPage;

VideoPage.getInitialProps = async () => {
  const StoryData = await fetcher(getQueries.getRandomStory());

  return { StoryData: StoryData.findStoryByRandom };
};
