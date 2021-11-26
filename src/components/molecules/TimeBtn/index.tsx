import { Btn } from "src/components/atoms";
import styled from "styled-components";

interface TimeBtnProps {
  data: string[];
  value: string;
  setValue: (e: string) => void;
}
const TimeBtn = ({ data, value, setValue }: TimeBtnProps) => {
  return (
    <Container>
      {data.map((d) => (
        <StyledBtn
          key={d}
          type={value === d ? "primary" : "empty"}
          onClick={value === d ? () => setValue("") : () => setValue(d)}
        >
          {d}
        </StyledBtn>
      ))}
    </Container>
  );
};

export default TimeBtn;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledBtn = styled(Btn)`
  width: 60px;
  height: 30px;
  margin-right: 12px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 17px;
`;
