const getAllPF = (category: string, title?: string, place?: string) => {
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

const getQueries = {
  getAllPF,
  getPF,
};

export default getQueries;
