import {
  FilmIcon,
  MusicIcon,
  PlusIcon,
  SpeakerIcon,
} from "src/assets/icon/main";
import { Icon } from "src/components/atoms";
import { CategoryType } from "src/interfaces/types";
import styled from "styled-components";

interface CategoryProps {
  setCategory: (e: CategoryType) => void;
}
const Category = ({ setCategory }: CategoryProps) => {
  return (
    <Container>
      <Icon
        className="category_btn"
        role="button"
        onClick={() => setCategory("MUSIC")}
      >
        <MusicIcon />
        <p>음악</p>
      </Icon>
      <Icon
        className="category_btn"
        role="button"
        onClick={() => setCategory("DANCING")}
      >
        <SpeakerIcon />
        <p>춤</p>
      </Icon>
      <Icon
        className="category_btn"
        role="button"
        onClick={() => setCategory("ACTING")}
      >
        <FilmIcon />
        <p>극</p>
      </Icon>
      <Icon
        className="category_btn"
        role="button"
        onClick={() => setCategory("OTHER")}
      >
        <PlusIcon />
        <p>그 외</p>
      </Icon>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;

  .category_btn {
    border-right: 0.5px solid var(--gray_200);
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      all: unset;
      font-size: 13px;
      line-height: 17px;
      color: var(--white);
      margin-top: 8px;
    }
  }
`;
