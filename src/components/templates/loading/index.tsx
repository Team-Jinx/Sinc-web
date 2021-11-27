import styled, { css, keyframes } from "styled-components";
import { MainIconSmall } from "src/assets/icon/common";

const Loading = () => {
  return (
    <Container>
      <MainIconSmall className="icon" />
    </Container>
  );
};

export default Loading;

const rotate = keyframes`
    100%{transform: rotate(360deg);}
`;
const rotateRule = css(
  ["", " 1.2s ease-in-out infinite"] as any as TemplateStringsArray,
  rotate,
);

const Container = styled.div`
  width: fit-content;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .icon {
    width: 40px;
    animation: ${rotateRule};
  }
`;
