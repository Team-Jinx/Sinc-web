import { ReactNode } from "react";
import styled from "styled-components";

interface ImgBoxProps {
  className?: string;
  children?: ReactNode;
  url?: string;
}
const ImgBox = ({ className, children, url }: ImgBoxProps) => {
  return (
    <Conatainer className={className} url={url} role="img">
      {children}
    </Conatainer>
  );
};

export default ImgBox;

interface ContainerProps {
  url?: string;
}
const Conatainer = styled.div<ContainerProps>`
  background: url("${({ url }) => url}") center center / cover;
`;
