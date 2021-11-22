import { ArrowLeftIcon } from "src/assets/icon/common";
import styled from "styled-components";

interface HeaderProps {
  title: string;
  onClick: () => void;
}
const Header = ({ title, onClick }: HeaderProps) => {
  return (
    <Container>
      <ArrowLeftIcon className="arrow_left" onClick={onClick} />
      <span style={{ marginBottom: "12px" }}>{title}</span>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 73px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  background-color: var(--black);
  font-weight: 500;
  font-size: 15.36px;
  line-height: 130%;
  color: var(--white);

  .arrow_left {
    position: absolute;
    left: 0;
  }
`;
