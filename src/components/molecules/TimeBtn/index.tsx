import { Btn } from "src/components/atoms";
import styled from "styled-components";

interface TimeBtnProps {
  data: ({ id: string; time: string } | undefined)[];
  value: string;
  setValue: (e: { id: string; time: string }) => void;
}
const TimeBtn = ({ data, value, setValue }: TimeBtnProps) => {
  return (
    <Container>
      {data?.map(
        (d) =>
          d !== undefined && (
            <StyledBtn
              key={d.id}
              type={value === d.time ? "primary" : "empty"}
              onClick={
                value === d.time
                  ? () =>
                      setValue({
                        id: "",
                        time: "",
                      })
                  : () =>
                      setValue({
                        id: d.id,
                        time: d.time,
                      })
              }
            >
              {d.time}
            </StyledBtn>
          ),
      )}
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
