import styled from "styled-components";
import { NotiDataProps } from "src/interfaces/PFData";

interface NotiListProps {
  NotiDatas: NotiDataProps[];
}
const NotiList = ({ NotiDatas }: NotiListProps) => {
  return (
    <Container>
      {NotiDatas?.map((nd) => (
        <Item src={nd.story.backgroundUrl} />
      ))}
    </Container>
  );
};

export default NotiList;

const Container = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1px;
  row-gap: 1px;
`;

const Item = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
