import React, { ReactNode } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";

const TIMEOUT = 300;
const getTransitionStyles = {
  entering: {
    position: "absolute",
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
};
// entering: 렌더 되기 전 상태, entered: 렌더 후 상태, exiting: 화면에서 사라질 때

interface PageTransitionProps {
  children: ReactNode;
  pageNum?: number;
}
const PageTransition = ({ children, pageNum }: PageTransitionProps) => {
  const router = useRouter();

  return (
    <>
      <TransitionGroup style={{ position: "relative" }}>
        <Transition
          key={pageNum !== undefined ? pageNum : router.pathname}
          timeout={{
            enter: TIMEOUT,
            exit: TIMEOUT,
          }}
        >
          {(status: "entering" | "entered" | "exiting") => (
            <div
              // @ts-ignore
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </>
  );
};

export default PageTransition;
