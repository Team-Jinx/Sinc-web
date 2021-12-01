import { useRouter } from "next/router";
import { ArrowRight } from "src/assets/icon/common";
import { PopStoriesDataProps } from "src/interfaces/StoryData";
import styled from "styled-components";

interface PopListProps {
  data: PopStoriesDataProps[];
}
const PopList = ({ data }: PopListProps) => {
  const router = useRouter();
  return (
    <Container>
      <div className="list_header">
        <h1 className="pf_list_title">인기 있는 소식</h1>
        <ArrowRight onClick={() => router.push("/popular")} />
      </div>
      <ListWrap>
        {data?.map((d) => (
          <video
            key={d.id}
            className="poster_img"
            preload="metadata"
            src={d.backgroundUrl + "#t=0.5"}
            onClick={() => router.push(`/video/${d.id}`)}
          />
        ))}
      </ListWrap>
    </Container>
  );
};

export default PopList;

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    all: unset;
  }
  .list_header {
    width: 100%;
    padding: 0 20px;
    height: 24px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .pf_list_title {
      width: 320px;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: var(--white);
    }
  }
`;

const ListWrap = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;

  ::-webkit-scrollbar {
    appearance: none;
  }

  .poster_img {
    width: 119px;
    height: 180px;
    border-radius: 4px;
    margin-right: 8px;
    object-fit: cover;
  }
`;
