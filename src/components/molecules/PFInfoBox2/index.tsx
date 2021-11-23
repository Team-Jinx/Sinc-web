import styled from "styled-components";

interface PFInfoBox2Props {
  location?: string;
  runtime: number;
  ticketPrice: number;
}
const PFInfoBox2 = ({ location, runtime, ticketPrice }: PFInfoBox2Props) => {
  return (
    <Container>
      <p>
        <b>공연장</b>
      </p>
      <p>{location}</p>
      <p>
        <b>관람시간</b>
      </p>
      <p>{runtime}분</p>
      <p>
        <b>티켓 가격</b>
      </p>
      <p>{ticketPrice}원</p>
    </Container>
  );
};

export default PFInfoBox2;

const Container = styled.section`
  width: 320px;
  padding: 24px 0;
  display: grid;
  grid-template-columns: 56px auto;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 45px;
  row-gap: 16px;
  font-size: 14px;
  line-height: 150%;
  color: var(--white);
  p {
    all: unset;
    height: 21px;
  }
`;
