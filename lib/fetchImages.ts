import { API_ACCESS_KEY } from "./API_ACCESS_TOKEN";

export const fetchImages = async (query: string, page = 1) => {  
  const queryText = query ? `search/photos?query=${query}&` : "photos?"

  try {
    const response = await fetch(`https://api.unsplash.com/${queryText}per_page=20&page=${page}&order_by=popular`, {
      cache: 'force-cache', // caches data 
      headers: {
        Authorization: `Client-ID ${API_ACCESS_KEY}`
      }
    })
    if (!response.ok) {
      throw new Error("Failed to fetch photos!");
    }

    const data = await response.json();

    return query ? data?.results : data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
}



export const fetchImageDetails = async (id: string) => {  
  try {
    const response = await fetch(`https://api.unsplash.com/photos/${id}/statistics?quantity=1`, {
      cache: 'force-cache', // caches data 
      headers: {
        Authorization: `Client-ID ${API_ACCESS_KEY}`
      }
    })
    if (!response.ok) {
      throw new Error("Failed to fetch photos!");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
}
