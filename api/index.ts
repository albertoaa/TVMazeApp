const API_URL: string = 'https://api.tvmaze.com';

export const getShowInfo = async (query: string, getEpisodesInfo: boolean) => {
  const embedEpisodes = getEpisodesInfo ? '&embed=episodes' : '';
  const response = await fetch(
    `${API_URL}/singlesearch/shows?q=${query}${embedEpisodes}`
  );
  const data = await response.json();
  return data;
};
