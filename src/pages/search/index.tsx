import { useRouter } from "next/router";
import { useState } from "react";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { SearchIcon } from "src/assets/icon/main";
import { XIcon } from "src/assets/icon/search";
import { Header } from "src/components/molecules";
import styled, { css } from "styled-components";

const Search = () => {
  const router = useRouter();
  const [menu, setMenu] = useState<"PERFORMANCE" | "VIDEO">("PERFORMANCE");
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState(0);

  const handleGoBackButton = () => {
    router.back();
  };

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const resetKeyword = () => setKeyword("");

  return (
    <Container>
      <Header
        title="검색"
        leftIcon={
          <ArrowLeftIcon
            style={{ marginBottom: "4px" }}
            onClick={handleGoBackButton}
          />
        }
      />
      <SearchBar>
        <StyledSearchIcon />
        <Input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={changeKeyword}
        />
        {keyword !== "" && <StyledXIcon onClick={resetKeyword} />}
      </SearchBar>
      <ButtonContainer>
        <TabButton
          isAtv={menu === "PERFORMANCE"}
          onClick={() => setMenu("PERFORMANCE")}
        >
          공연
        </TabButton>
        <TabButton isAtv={menu === "VIDEO"} onClick={() => setMenu("VIDEO")}>
          비디오
        </TabButton>
      </ButtonContainer>
      <ResultText>총 {count}개의 결과</ResultText>
      {menu === "PERFORMANCE" ? (
        <ContentsContainer>공연</ContentsContainer>
      ) : (
        <ContentsContainer>비디오</ContentsContainer>
      )}
    </Container>
  );
};

export default Search;

const SearchBar = styled.div`
  background-color: var(--gray_850);
  height: 40px;
  width: 320px;
  margin-top: 90px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;
  border-radius: 4px;

  input[type="text"] {
    background-color: var(--gray_850);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  font-size: 16px;
  line-height: 19.2px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: -2%;
  border: none;
  width: 100%;
  color: var(--white);

  :focus {
    outline: none;
  }

  ::placeholder {
    color: var(--white);
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  margin-left: 12px;
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;

const StyledXIcon = styled(XIcon)`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  margin-left: 6px;
`;

const ButtonContainer = styled.menu`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid var(--gray_600);
  margin: 0;
  margin-bottom: 6.8px;
  padding: 0;
`;

interface TabBtnProps {
  isAtv: boolean;
}
const TabButton = styled.button<TabBtnProps>`
  all: unset;
  box-sizing: border-box;
  padding: 12px 11px;
  width: 50%;
  position: relative;
  bottom: -1px;
  text-align: center;
  font-size: 14px;
  line-height: 17px;
  color: var(--white);
  transition: 0.2s;
  ${({ isAtv }) =>
    isAtv &&
    css`
      color: var(--primary);
      border-bottom: 2px solid var(--primary);
      font-weight: 700;
      padding-bottom: 10px;
    `}
`;

const ResultText = styled.p`
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  line-height: 14.4px;
  letter-spacing: -2%;
  text-align: center;
  color: var(--gray_100);
  margin: 19px 0 10px 21px;
  align-self: flex-start;
`;

const ContentsContainer = styled.div`
  color: var(--white);
`;
