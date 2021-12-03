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
const getStory = (id: string, userId: string) => `
  {
    findStoryById(id:"${id}", userId:"${userId}"){
      videoUrl
      cheerCount
      createdAt
      description
      id
      ticketCount
      amount
      performanceId
      performance {
        artist {
          name
          agency
        }
        title
        posterUrl
        place
        reservationTimes {
          id
          toReserveAt
        }
        totalTicketCount
        cheerCount
      }
      usersCheeredPerformances {
        id
      }
    }
  }
`;

const getRandomStory = (
  userId: string,
  field?: string,
  direction?: string,
  cursor?: string,
) => `
  {
    findStoriesByRandom(
      take: 5,
      userId:"${userId}",
      ${field !== undefined ? `field:"${field}",` : ""}
      ${direction !== undefined ? `direction:${direction},` : ""}
      ${cursor !== undefined ? `cursor:"${cursor}",` : ""}
    ){
      field
      direction
      data {
        id
        amount
        videoUrl
        cheerCount
        description
        createdAt
        ticketCount
        performanceId
        performance {
          artist {
            name
            agency
          }
          title
          posterUrl
          place
          reservationTimes {
            id
            toReserveAt
          }
          totalTicketCount
          cheerCount
        }
        usersCheeredPerformances {
          id
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

const getUserCheeredPF = (userId: string, limit: number, offset: number) => `
{
  findUsersCheeredPerformances(
    userId:"${userId}",
    take: ${limit},
    skip: ${offset},
  ){
    story {
      id
      videoUrl
    }
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
  getUserCheeredPF,
};

export default getQueries;
