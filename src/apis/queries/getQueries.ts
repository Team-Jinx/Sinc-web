import { GetNoticeProps } from "src/interfaces/StoryData";
import { CategoryType } from "src/interfaces/types";

interface getAllPFProps {
  limit?: number;
  offset?: number;
  category?: CategoryType;
  keyword?: string;
  title?: string;
  place?: string;
}
const getAllPF = ({
  limit,
  offset,
  category,
  keyword,
  title,
  place,
}: getAllPFProps) => `{
  findPerformances(
    ${category !== undefined ? `category: "${category}",` : ""}
    ${keyword !== undefined ? `keyword: "${keyword}",` : ""}
    ${limit !== undefined ? `take: ${limit},` : ""}
    ${offset !== undefined ? `skip: ${offset},` : ""}
    ${title !== undefined ? `,title:"${title}",` : ""} 
    ${place !== undefined ? `,place:"${place}` : ""}
  ) {
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
            inquiryLink
            _count {
              performances
            }			
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
    }
}`;

const getPopPF = () => `
  {
    findPopularPerformances {
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

const getHotPF = () => `
  {
    findPerformancesByPercentage{
      id
      artist {
        agency
        name
      }
      posterUrl
      title
      reservationTimes{
        toReserveAt
      }
      ticketPercentage
    }
  }
`;

const getArtist = (artisId: string) => `
  {
    findArtistById(id:"${artisId}") {
      id
      agency
      name
      description
      inquiryLink
      performances {
        id
        posterUrl
        title
        reservationTimes {
          id
          toReserveAt
        }
        place
      }
      profileUrl
    }
  }
`;

const getArtistPF = (artistId: string, limit?: number, offset?: number) => `
  {
    findPerformances(
      artistId:"${artistId}", 
      ${limit !== undefined ? `take:${limit},` : ""} 
      ${offset !== undefined ? `skip:${offset}` : ""}
    ) {
        id
        posterUrl
        place
        artist {
          agency
          name
        }
        reservationTimes {
          id
          toReserveAt
        }
      }
  }
`;

const getTwoArtist = () => `
  {
    findTwoArtists {
      agency
      id
      name
      profileUrl
      performances {
        title
      }
      _count {
        performances
      }
    }
  }
`;

interface getPopStoriesProps {
  limit?: number;
  offset?: number;
  userId: string;
}
const getPopStories = ({ limit, offset, userId }: getPopStoriesProps) => `
  {
    findPopularStories(
      ${limit !== undefined ? `take:${limit},` : ""} 
      ${offset !== undefined ? `skip:${offset},` : ""} 
      userId:"${userId}" 
    ){
      videoUrl
      id
    }
  }
`;

interface getStoryProps {
  id?: string;
  userId?: string;
}
const getStory = ({ id, userId }: getStoryProps) => `
  {
    findStoryById(
      ${id !== undefined ? `id:"${id}",` : ""} 
      ${userId !== undefined ? `userId:"${userId}",` : ""}
    ){
      videoUrl
      cheerCount
      createdAt
      description
      id
      ticketCount
      amount
      performanceId
      performance {
        id
        artistId
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
  category?: CategoryType,
) => `
  {
    findStoriesByRandom(
      take: 5,
      userId:"${userId}",
      ${field !== undefined ? `field:"${field}",` : ""}
      ${direction !== undefined ? `direction:${direction},` : ""}
      ${cursor !== undefined ? `cursor:"${cursor}",` : ""}
      ${category !== undefined ? `category:${category},` : ""}
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
          id
          artistId
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

const getNotice = ({
  artistId,
  performanceId,
  type,
  userId,
  limit,
  offset,
  keyword,
}: GetNoticeProps) => `
  {
    findStories( 
      ${artistId !== undefined ? `artistId:"${artistId}",` : ""}
      ${performanceId !== undefined ? `performanceId:"${performanceId}",` : ""}
      ${type !== undefined ? `type:${type},` : ""}
      ${userId !== undefined ? `userId:"${userId}",` : ""}
      ${limit !== undefined ? `take:${limit},` : ""}
      ${offset !== undefined ? `skip:${offset},` : ""}
      ${keyword !== undefined ? `keyword:"${keyword}",` : ""}
    ) {
      id
      imageUrl
      videoUrl
      description
      createdAt
      cheerCount
      type
      performanceId
      notifications {
        id
        storyId
      }
      usersCheeredPerformances {
        id
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

const getUserBoughtPF = (userId: string, limit?: number, offset?: number) => `
  {
    findUsersBoughtPerformances(
      userId:"${userId}",
      ${limit !== undefined ? `take: ${limit},` : ""}
      ${offset !== undefined ? `skip: ${offset},` : ""}
    ){
      performance {
        id
        createdAt
        posterUrl
        place
        title
        reservationTimes {
          id
          toReserveAt
        }
      }
    }
  }
`;

const getUserCheeredPF = (userId: string, limit?: number, offset?: number) => `
{
  findUsersCheeredPerformances(
    userId:"${userId}",
    ${limit !== undefined ? `take: ${limit},` : ""}
    ${offset !== undefined ? `skip: ${offset},` : ""}
  ){
    story {
      id
      videoUrl
    }
  }
}
`;

const getUserTicket = (userId: string) => `
{
  findUserImminentTicket(userId:"${userId}") {
    reservationTime {
      toReserveAt
    }
    ticketCount
    performance {
      title
      posterUrl
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
  getArtist,
  getNotice,
  getArtistPF,
  getUserBoughtPF,
  getUserCheeredPF,
  getUserTicket,
  getHotPF,
  getTwoArtist,
};

export default getQueries;
