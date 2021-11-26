import { ArrowRight } from "src/assets/icon/common";
import styled from "styled-components";

interface PopListProps {
  data: string[];
}
const PopList = ({ data }: PopListProps) => {
  return (
    <Container>
      <div className="list_header">
        <h1 className="pf_list_title">인기 있는 소식</h1>
        <ArrowRight />
      </div>
      <ListWrap>
        {data.map((d) => (
          <img key={d} className="poster_img" alt="poster_img" src={d} />
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
    width: 320px;
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
