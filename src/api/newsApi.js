import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2";
const NEWSDATA_API_URL = "https://newsdata.io/api/1/latest";

const fallbackArticles = [
  {
    title: "Global technology leaders focus on practical AI tools",
    description:
      "Companies are shifting attention from experiments to useful AI features for productivity, customer support, and software development.",
    content:
      "Technology teams are putting more emphasis on reliable AI workflows that solve clear business problems.",
    url: "https://www.reuters.com/technology/",
    urlToImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date().toISOString(),
    source: { name: "NewsApp Desk" },
  },
  {
    title: "Markets watch inflation data and central bank signals",
    description:
      "Investors are tracking economic releases for clues about interest rates, consumer spending, and company earnings.",
    content:
      "Economic data remains a major driver for market expectations as traders review growth and inflation trends.",
    url: "https://www.reuters.com/markets/",
    urlToImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date().toISOString(),
    source: { name: "NewsApp Desk" },
  },
  {
    title: "Health researchers study better ways to detect disease early",
    description:
      "New screening tools and data-driven analysis are helping doctors identify risks before symptoms become severe.",
    content:
      "Medical researchers continue to test approaches that could make early diagnosis more accessible.",
    url: "https://www.nih.gov/news-events/news-releases",
    urlToImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    publishedAt: new Date().toISOString(),
    source: { name: "NewsApp Desk" },
  },
];

const getApiKey = () => import.meta.env.VITE_NEWS_API_KEY?.trim();

const normalizeNewsDataArticle = (article) => ({
  title: article.title,
  description: article.description || article.content,
  content: article.content || article.description,
  url: article.link,
  urlToImage: article.image_url,
  publishedAt: article.pubDate,
  source: { name: article.source_name || "NewsData" },
});

const isValidArticle = (article) =>
  article?.title &&
  article.title !== "[Removed]" &&
  article.title !== "[Removed}" &&
  article.url;

export async function fetchNews({ category = "", query = "", page = 1, pageSize = 10 }) {
  const apiKey = getApiKey();

  if (!apiKey) {
    return {
      articles: fallbackArticles,
      totalResults: fallbackArticles.length,
      warning: "Missing VITE_NEWS_API_KEY. Showing sample headlines.",
    };
  }

  try {
    if (apiKey.startsWith("pub_")) {
      const params = {
        apikey: apiKey,
        language: "en",
        size: pageSize,
        ...(query.trim() && { q: query.trim() }),
        ...(category && { category }),
      };

      const { data } = await axios.get(NEWSDATA_API_URL, { params });
      const articles = (data.results || [])
        .map(normalizeNewsDataArticle)
        .filter(isValidArticle);

      return {
        articles,
        totalResults: articles.length,
        warning: articles.length ? "" : "No articles found.",
      };
    }

    const endpoint = query.trim()
      ? `${NEWS_API_URL}/everything`
      : `${NEWS_API_URL}/top-headlines`;
    const params = query.trim()
      ? {
          q: query.trim(),
          language: "en",
          sortBy: "publishedAt",
          pageSize,
          page,
          apiKey,
        }
      : {
          country: "us",
          pageSize,
          page,
          apiKey,
          ...(category && { category }),
        };

    const { data } = await axios.get(endpoint, { params });
    const articles = (data.articles || []).filter(isValidArticle);

    return {
      articles,
      totalResults: data.totalResults || articles.length,
      warning: articles.length ? "" : "No articles found.",
    };
  } catch (error) {
    console.error("News API error:", error);
    return {
      articles: fallbackArticles,
      totalResults: fallbackArticles.length,
      warning: "Live news could not be loaded. Showing sample headlines.",
    };
  }
}
