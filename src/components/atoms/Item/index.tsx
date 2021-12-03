import { useRouter } from "next/router";
import { forwardRef, RefObject } from "react";
import styled from "styled-components";

interface ItemProps {
  isVideo: boolean;
  url?: string;
  isAd: boolean;
  id?: number;
  handleclick?: () => void;
}
const Item = forwardRef(
  (
    { isVideo, url = "", isAd, handleclick }: ItemProps,
    ref?:
      | ((instance: HTMLDivElement | null) => void)
      | RefObject<HTMLDivElement>
      | null
      | undefined,
  ) => {
    const router = useRouter();
    return (
      <ItemWrap
        onClick={() => {
          handleclick ? handleclick() : router.push(`/video/notice`);
        }}
        ref={ref}
      >
        {isAd && <span className="noti_tag">공지</span>}
        {isVideo ? (
          <video className="item" preload="metadata" src={url + "#t=0.5"} />
        ) : (
          <img alt="item" className="item" src={url} />
        )}
      </ItemWrap>
    );
  },
);

export default Item;

const ItemWrap = styled.div`
  width: 100%;
  height: 180px;

  .noti_tag {
    position: absolute;
    z-index: 2;
    transform: translate(7px, 7px);
    background: var(--gray_800);
    border-radius: 4px;
    padding: 1px 7px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    color: var(--white);
  }

  .item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
