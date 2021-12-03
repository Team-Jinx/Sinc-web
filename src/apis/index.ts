import { GraphQLClient } from "graphql-request";
import cookie from "react-cookies";
import { getQueries } from "./queries";

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: "",
  },
});

// access token 발급
export const getAccessToken = async (code: string) => {
  const graphQLLogin = new GraphQLClient(API_URL, {
    headers: {
      Authorization: code,
    },
  });

  const res = await graphQLLogin.request(getQueries.getAccessToken());
  return res.loginByKakao.accessToken;
};

export const getRefreshToken = async () => {
  const res = await graphQLClient.request(getQueries.getRefreshToken());
  await setGraphQLClient(res.loginByJwt.accessToken);
};

export const setGraphQLClient = async (accessToken: string) => {
  graphQLClient.setHeader("Authorization", "Bearer " + accessToken);

  // 만료일 설정(2년), 쿠키 저장
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 2);
  cookie.save("access-token", accessToken, {
    path: "/",
    expires,
    httpOnly: false, // dev/prod 에 따라 false / true 로 받게 했다.
  });
};

const fetcher = async (query: string) => {
  const res = await graphQLClient.request(query);
  return res;
};

export default fetcher;
