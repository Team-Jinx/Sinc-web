import { Dispatch, SetStateAction } from "react";
import {
  Filter1Img,
  Filter2Img,
  Filter3Img,
  Filter4Img,
  Filter5Img,
  FilterBlack1Img,
  FilterBlack2Img,
  FilterBlack3Img,
  FilterBlack4Img,
  FilterBlack5Img,
} from "src/assets/img";
import { CategoryType } from "src/interfaces/types";
import styled, { css, keyframes } from "styled-components";

interface CategoryBottomSheetProps {
  category: CategoryType | undefined;
  handleChangeCategory: (category: CategoryType | undefined) => void;
  isCategoryModelOpen: boolean;
  setIsCategoryModelOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryBottomSheet = ({
  category,
  handleChangeCategory,
  isCategoryModelOpen,
  setIsCategoryModelOpen,
}: CategoryBottomSheetProps) => {
  return (
    <>
      {isCategoryModelOpen && (
        <Background onClick={() => setIsCategoryModelOpen(false)} />
      )}
      <Container isOpen={isCategoryModelOpen}>
        <Line />
        <CategoryButton
          onClick={() => handleChangeCategory(undefined)}
          src={category === undefined ? Filter1Img.src : FilterBlack1Img.src}
        >
          <p>전체</p>
        </CategoryButton>
        <CategoryButton
          onClick={() => handleChangeCategory("MUSIC")}
          src={category === "MUSIC" ? Filter2Img.src : FilterBlack2Img.src}
        >
          <p>음악</p>
        </CategoryButton>
        <CategoryButton
          onClick={() => handleChangeCategory("DANCING")}
          src={category === "DANCING" ? Filter3Img.src : FilterBlack3Img.src}
        >
          <p>츰</p>
        </CategoryButton>
        <CategoryButton
          onClick={() => handleChangeCategory("ACTING")}
          src={category === "ACTING" ? Filter4Img.src : FilterBlack4Img.src}
        >
          <p>극</p>
        </CategoryButton>
        <CategoryButton
          onClick={() => handleChangeCategory("OTHER")}
          src={category === "OTHER" ? Filter5Img.src : FilterBlack5Img.src}
        >
          <p>그 외</p>
        </CategoryButton>
      </Container>
    </>
  );
};

export default CategoryBottomSheet;

const mobileFadeIn = keyframes`
  from {
    bottom: -700px
  }
  to {
    bottom: 54px;
  }
`;
const mobileFadeInRule = css(
  ["", " 0.1s linear"] as any as TemplateStringsArray,
  mobileFadeIn,
);

const mobileFadeOut = keyframes`
  from {
    bottom: 54px;
  }
  to {
    bottom: -700px
  }
`;
const mobileFadeOutRule = css(
  ["", " 0.1s linear"] as any as TemplateStringsArray,
  mobileFadeOut,
);

interface ContainerProps {
  isOpen: boolean;
}
const Container = styled.section<ContainerProps>`
  position: absolute;
  z-index: 4;
  left: 0px;
  width: 100%;
  padding: 23px 20px 0px 20px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray_1000);
  ${({ isOpen }) =>
    isOpen
      ? css`
          bottom: 54px;
          animation: ${mobileFadeInRule};
        `
      : css`
          bottom: -700px;
          animation: ${mobileFadeOutRule};
        `};
`;

const Background = styled.div`
  position: absolute;
  left: 0px;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  padding-bottom: 54px;
`;

interface CategoryButtonProps {
  src: string;
}
const CategoryButton = styled.div<CategoryButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 15vh;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: 100%;
  color: var(--white);
  font-size: 18px;
`;

const Line = styled.div`
  position: absolute;
  width: 55.5px;
  height: 0px;
  top: 8px;
  background-color: var(--gray_500);
  border: 3px solid var(--gray_500);
  border-radius: 5px;
`;
