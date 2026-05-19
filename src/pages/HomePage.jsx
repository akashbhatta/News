import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Hero from './Hero';
import CategoryList from '../components/CategoryList'
import NewsList from '../components/NewsList';
import SearchBar from "../components/SearchBar" 
import { fetchNews as fetchNewsFromApi } from '../api/newsApi';


function HomePage() {

  const {category = ""} = useParams();
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  
  const PAGE_SIZE = 10;
  const maxPage = Math.min(Math.ceil(totalResults / PAGE_SIZE), 10);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchNewsFromApi({
        category,
        query,
        page,
        pageSize: PAGE_SIZE,
      });

      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setError(data.warning || "");
    } catch (err) {
      console.log("News load error:", err);
      setArticles([]);
      setTotalResults(0);
      setError("Could not load news.");
    } finally {
      setLoading(false);
    }
  }, [category, query, page]);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    setPage(1);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNews();
  }, [loadNews]);

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
    setQuery("");
  },[category]);

  return (
    <div>
      <Hero/>
      <SearchBar onSearch={handleSearch}/>
      <CategoryList/>

      <p>
        Showing {articles.length} of {totalResults.toLocaleString()} articles
        {category && ` in ${category}`}
      </p>

      <NewsList articles={articles} loading={loading} error={error}/>

      {maxPage > 1 && (
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>Page {page} of {maxPage}</span>
          <button onClick={() => setPage(page + 1)} disabled={page >= maxPage}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
