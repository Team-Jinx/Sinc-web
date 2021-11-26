import { CategoryType } from "src/interfaces/types";

const getAllPF = (category: CategoryType, title?: string, place?: string) => {
  return `{
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
              toReserveAt
          }
        }
    }`;
};

const getPF = (id: string) => {
  return `{
        findPerformanceById(id: "${id}" ) {
            id
            artist { 
                agency
                 name				
            }
            artistId
            posterUrl
            place
            title
            showTime
            runningTime
            price
            description
        }
    }`;
};

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
      cheerCount
      createdAt
      description
      id
      performanceId
      performance{
        title
        posterUrl
        artist {
          agency
          name
        }
      }
    }
  }
`;

const getRandomStory = () => `
  {
    findStoryByRandom{
      cheerCount
      createdAt
      description
      id
      performanceId
      performance{
        title
        posterUrl
        artist {
          agency
          name
        }
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
};

export default getQueries;
