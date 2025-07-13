export const getAiringAnimes = async () => {
  /* 
  setLoading(true);
      try {
        const res = await fetch("https://api.jikan.moe/v4/seasons/now?sfw");
        if (!res.ok) throw new Error("Failed to fetch page 1");
        const data = await res.json();
        let allAiringAnimes = [...data.data];
        const { last_visible_page } = data.pagination;

        if (last_visible_page > 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        let requests = [];
        for (
          let currentPage = 2;
          currentPage <= last_visible_page;
          currentPage++
        ) {
          requests.push(currentPage);

          if (requests.length === 3 || currentPage === last_visible_page) {
            const results = await Promise.all(
              requests.map(async (page) => {
                try {
                  const res = await fetch(
                    `https://api.jikan.moe/v4/seasons/now?page=${page}&sfw`
                  );
                  if (!res.ok) throw new Error(`Failed to fetch page ${page}`);
                  const data = await res.json();
                  return data.data;
                } catch (error) {
                  toast.error(`Error loading page ${page}`);
                  return null;
                }
              })
            );
            results
              .filter(Boolean)
              .forEach((anime) => allAiringAnimes.push(...anime));
            requests = [];
            if (currentPage < last_visible_page) {
              await new Promise((resolve) => setTimeout(resolve, 2000));
            }
          }
        }

        const uniqueAiringAnimes = [];
        const seen = new Set();
        for (const anime of allAiringAnimes) {
          if (!seen.has(anime.mal_id)) {
            seen.add(anime.mal_id);
            uniqueAiringAnimes.push(anime);
          }
        }

        setTrendingAnimes(uniqueAiringAnimes);
      } catch (error) {
        toast.error("Error loading animes");
      } finally {
        setLoading(false);
      }
  */
};

export const getTrendingAnimes = async () => {
  try {
    const res = await fetch("https://api.jikan.moe/v4/seasons/now");
    if (!res.ok) throw new Error("Failed to fetch trending animes");
    const data = await res.json();
    return data.data.filter((anime) => anime.airing).slice(0, 6);
  } catch (error) {
    console.error({
      message: "Error getting trending animes",
      error: error.message,
    });
  }
};
