import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "src/assets/icon/header";
import { SearchIcon } from "src/assets/icon/main";
import { XIcon } from "src/assets/icon/search";
import { Item } from "src/components/atoms";
import { Header, PFInfoBox } from "src/components/molecules";
import { PFInfoDataProps } from "src/interfaces/PFData";
import { StoryDataProps } from "src/interfaces/StoryData";
import { ExtractPeriodAsStr } from "src/libs";
import styled, { css } from "styled-components";
import { Loading } from "src/components/templates";

interface SearchProps {
  PFDataList?: PFInfoDataProps[];
  StoryDataList?: StoryDataProps[];
  isSearched: boolean;
  handleSearch: (
    keyword: string,
    category: "PERFORMANCE" | "VIDEO",
  ) => Promise<void>;
}
const Search = ({
  PFDataList = [],
  StoryDataList = [],
  handleSearch,
  isSearched,
}: SearchProps) => {
  const router = useRouter();
  const [menu, setMenu] = useState<"PERFORMANCE" | "VIDEO">("PERFORMANCE");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log(StoryDataList);
  }, [StoryDataList]);

  useEffect(() => {
    if (isSearched) {
      handleSearch(keyword, menu);
    }
  }, [menu]);

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
      <div style={{ padding: "0 20px", width: "100%" }}>
        <SearchBar>
          <StyledSearchIcon />
          <Input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={keyword}
            onChange={changeKeyword}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(keyword, menu)}
          />
          {keyword !== "" && <StyledXIcon onClick={resetKeyword} />}
        </SearchBar>
      </div>
      {isSearched && (
        <>
          <ButtonContainer>
            <TabButton
              isAtv={menu === "PERFORMANCE"}
              onClick={() => setMenu("PERFORMANCE")}
            >
              공연
            </TabButton>
            <TabButton
              isAtv={menu === "VIDEO"}
              onClick={() => setMenu("VIDEO")}
            >
              비디오
            </TabButton>
          </ButtonContainer>
          <ResultText>
            총{" "}
            {menu === "PERFORMANCE" ? PFDataList.length : StoryDataList.length}
            개의 결과
          </ResultText>
          <>
            {menu === "PERFORMANCE" ? (
              <>
                {PFDataList === undefined ? (
                  <Loading />
                ) : (
                  <PFContainer>
                    {PFDataList.map((p) => (
                      <StyledPFInfoBox
                        type="detail"
                        url={p.posterUrl}
                        univName={p.artist.agency + " " + p.artist.name}
                        title={p.title}
                        date={ExtractPeriodAsStr(p.reservationTimes)}
                        location={p.place}
                        handleClick={() => router.push(`/detail/${p.id}`)}
                      />
                    ))}
                  </PFContainer>
                )}
              </>
            ) : (
              <>
                {StoryDataList === undefined ? (
                  <Loading />
                ) : (
                  <StoryContainer>
                    {StoryDataList.map((s) => (
                      <>
                        {s.videoUrl !== null && (
                          <Item
                            isVideo={s.videoUrl !== null}
                            url={s.videoUrl}
                            isAd={false}
                            handleclick={() => router.push(`/video/${s.id}`)}
                          />
                        )}
                      </>
                    ))}
                  </StoryContainer>
                )}
              </>
            )}
          </>
        </>
      )}
    </Container>
  );
};

export default Search;

const SearchBar = styled.div`
  background-color: var(--gray_850);
  height: 40px;
  width: 100%;
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

const PFContainer = styled.section`
  width: 100%;
  padding: 22px 24px 0;
  display: flex;
  flex-direction: column;
  background-color: var(--gray_1000);
`;

const StoryContainer = styled.section`
  width: 100%;
  padding-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1px;
  row-gap: 1px;
  background-color: var(--gray_1000);
`;

const StyledPFInfoBox = styled(PFInfoBox)`
  padding: 0 0;
  margin-bottom: 36px;
`;
