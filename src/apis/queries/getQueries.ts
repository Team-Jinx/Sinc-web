import { CategoryType, DirectionType } from "src/interfaces/types";

const getAllPF = (category: CategoryType, title?: string, place?: string) => `{
    findPerformances(category:"${category}" 
    ${title !== undefined ? `,title:"${title}"` : ""} ${
  place !== undefined ? `,place:"${place}` : ""
} ) 
    {
      id
      artist { 
        agency
        name				
      }
      artistId
      place
      posterUrl
      title
      reservationTimes {
          id
          toReserveAt
      }
    }
}`;

const getPF = (id: string) => `{
    findPerformanceById(id: "${id}" ) {
        id
        artist { 
            agency
            name
            id
            profileUrl				
        }
        artistId
        amount
        posterUrl
        place
        title
        showTime
        runningTime
        price
        description
        fundingStatus
        reservationTimes {
          id
          toReserveAt
        }
        toEndAt
        totalTicketCount
        cheerCount
        ticketCount
        notifications {
          id
          message
          performanceId
          story {
            backgroundUrl
          }
          storyId
          type
        }
    }
}`;

const getPopPF = (category: CategoryType) => `
  {
    findPopularPerformances(category:"${category}"){
      id
      artist { 
        agency
        name				
      }
      posterUrl
      place
      title
      reservationTimes {
        toReserveAt
      }
    }
  }
`;

const getPopStories = (limit: number, offset: number) => `
  {
    findPopularStories(limit:${limit}, offset:${offset}){
      backgroundUrl
      id
    }
  }
`;

const getStory = (id: string) => `
  {
    findStoryById(id:"${id}"){
      backgroundUrl
      cheerCount
      createdAt
      description
      id
      performanceId
      performance{
        title
        posterUrl
        artist {
          id
          agency
          name
        }
      }
    }
  }
`;

const getRandomStory = (
  field?: string,
  direction?: string,
  cursor?: string,
) => `
  {
    findStoriesByRandom(
      take: 5,
      ${field !== undefined ? `field:"${field}",` : ""}
      ${direction !== undefined ? `direction:${direction},` : ""}
      ${cursor !== undefined ? `cursor:"${cursor}",` : ""}
    ){
      field
      direction
      data {
        id
        backgroundUrl
        cheerCount
        description
        createdAt
        performanceId
        performance {
          artist {
            name
            agency
          }
        }
     }
    }
  }
`;

const getAccessToken = () => `
  mutation{
    loginByKakao {
      accessToken
    }
  }
`;

const getRefreshToken = () => `
  mutation{
    loginByJwt {
      accessToken
    }
  }
`;

const getUserData = () => `
  {
    checkJwt {
      id
      nickname
      role
      profileUrl
    }
  }
`;

const getUserDetailData = (userId: string) => `
{
  findUserById(id:"${userId}"){
    isPushNotification
    profileUrl
  }
}
`;

const getQueries = {
  getAllPF,
  getPF,
  getPopPF,
  getPopStories,
  getStory,
  getRandomStory,
  getAccessToken,
  getRefreshToken,
  getUserData,
  getUserDetailData,
};

export default getQueries;
