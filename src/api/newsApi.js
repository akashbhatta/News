import axios from "axios";

const NEWS_API_URL = "https://newsapi.org/v2";
const NEWSDATA_API_URL = "https://newsdata.io/api/1/latest";
const REDDIT_LIMIT = 25;
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
];

const CATEGORY_SUBREDDITS = {
  business: "business",
  entertainment: "entertainment",
  general: "news",
  health: "health",
  science: "science",
  sports: "sports",
  technology: "technology",
};

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

const isValidArticle = (article) =>
  article?.title &&
  article.title !== "[Removed]" &&
  article.url &&
  article.description !== "[Removed]";

const getFallbackImage = (seed = "") => {
  const hash = Array.from(seed).reduce((total, char) => total + char.charCodeAt(0), 0);
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
};

const withArticleImages = (articles) =>
  articles.map((article, index) => ({
    ...article,
    urlToImage: article.urlToImage || getFallbackImage(`${article.title}-${article.url}-${index}`),
  }));

const normalizeNewsDataArticle = (article) => ({
  title: article.title,
  description: article.description || article.content,
  content: article.content || article.description,
  url: article.link,
  urlToImage: article.image_url,
  publishedAt: article.pubDate,
  source: { name: article.source_name || "NewsData" },
});

const normalizeRedditArticle = (post) => {
  const data = post.data;
  const previewImage = data.preview?.images?.[0]?.source?.url?.replaceAll("&amp;", "&");
  const thumbnail = data.thumbnail?.startsWith("http") ? data.thumbnail : "";

  return {
    title: data.title,
    description: data.selftext || data.subreddit_name_prefixed,
    content: data.selftext,
    url: data.url_overridden_by_dest || `https://www.reddit.com${data.permalink}`,
    urlToImage: previewImage || thumbnail,
    publishedAt: new Date(data.created_utc * 1000).toISOString(),
    source: { name: data.subreddit_name_prefixed || "Reddit News" },
  };
};

async function fetchPublicNews({ category, query, page, pageSize }) {
  const subreddit = CATEGORY_SUBREDDITS[category] || "news";
  const limit = Math.max(REDDIT_LIMIT, page * pageSize);
  const url = query.trim()
    ? `https://www.reddit.com/r/${subreddit}/search.json`
    : `https://www.reddit.com/r/${subreddit}/hot.json`;
  const params = query.trim()
    ? { q: query.trim(), restrict_sr: 1, sort: "new", limit }
    : { limit };

  const { data } = await axios.get(url, { params });
  const articles = withArticleImages((data.data?.children || [])
    .filter((post) => post.kind === "t3")
    .map(normalizeRedditArticle)
    .filter(isValidArticle));
  const start = (page - 1) * pageSize;

  return {
    articles: articles.slice(start, start + pageSize),
    totalResults: articles.length,
    warning: "",
  };
}

async function fetchNewsData({ apiKey, category, query, pageSize }) {
  const params = {
    apikey: apiKey,
    language: "en",
    size: pageSize,
    ...(query.trim() && { q: query.trim() }),
    ...(category && { category }),
  };

  const { data } = await axios.get(NEWSDATA_API_URL, { params });
  const articles = withArticleImages((data.results || []).map(normalizeNewsDataArticle).filter(isValidArticle));

  return {
    articles,
    totalResults: data.totalResults || articles.length,
    warning: articles.length ? "" : "No articles found.",
  };
}

async function fetchNewsApi({ apiKey, category, query, page, pageSize }) {
  const hasQuery = Boolean(query.trim());
  const endpoint = hasQuery ? `${NEWS_API_URL}/everything` : `${NEWS_API_URL}/top-headlines`;
  const params = hasQuery
    ? {
        q: query.trim(),
        language: "en",
        sortBy: "publishedAt",
        page,
        pageSize,
        apiKey,
      }
    : {
        country: "us",
        page,
        pageSize,
        apiKey,
        ...(category && { category }),
      };

  const { data } = await axios.get(endpoint, { params });
  const articles = withArticleImages((data.articles || []).filter(isValidArticle));

  return {
    articles,
    totalResults: data.totalResults || articles.length,
    warning: articles.length ? "" : "No articles found.",
  };
}

export async function fetchNews({ category = "", query = "", page = 1, pageSize = 10 }) {
  const apiKey = getApiKey();

  try {
    if (!apiKey) {
      return await fetchPublicNews({ category, query, page, pageSize });
    }

    if (apiKey.startsWith("pub_")) {
      return await fetchNewsData({ apiKey, category, query, pageSize });
    }

    return await fetchNewsApi({ apiKey, category, query, page, pageSize });
  } catch (error) {
    console.error("News fetch error:", error);

    try {
      return await fetchPublicNews({ category, query, page, pageSize });
    } catch (fallbackError) {
      console.error("Public news fetch error:", fallbackError);

      return {
        articles: fallbackArticles,
        totalResults: fallbackArticles.length,
        warning: "Live news could not be loaded. Showing sample headlines.",
      };
    }
  }
}
