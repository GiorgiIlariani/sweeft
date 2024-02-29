export const fetchImages = async (query: string) => {
  const cliendId = process.env.API_ACCESS_KEY;

  const queryText = query ? `search/photos?query=${query}&` : "photos?"

  try {
    const response = await fetch(`https://api.unsplash.com/${queryText}per_page=20&order_by=popular`, {
      headers: {
        Authorization: `Client-ID ${cliendId}`
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
