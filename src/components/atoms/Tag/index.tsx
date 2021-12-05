import { ReactNode } from "react";
import { TagGrayIcon, TagIcon } from "src/assets/icon/common";
import styled from "styled-components";

interface TagProps {
  className?: string;
  text: string | ReactNode;
  type: "my" | "video";
  onClick?: (e: any) => void;
}
const Tag = ({ className, text, type, onClick }: TagProps) => {
  return (
    <Container type={type} className={className} onClick={onClick}>
      <p className="tag_l">{text}</p>
      <img
        alt="tag_r"
        className="tag_r"
        src={type === "my" ? TagGrayIcon : TagIcon}
      />
    </Container>
  );
};

export default Tag;

interface ContainerProps {
  type: "my" | "video";
}
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .tag_l {
    margin: 0;
    padding: 6px 6px 7px 20px;
    background: ${({ type }) =>
      type === "my" ? "var(--gray_900)" : "rgba(20, 20, 20, 0.5)"};
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: var(--white);
  }

  .tag_r {
    height: 100%;
  }
`;
