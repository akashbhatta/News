import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Hero from './Hero';
import CategoryList from '../components/CategoryList'
import NewsList from '../components/NewsList';
import { fetchNews as fetchNewsFromApi } from '../api/newsApi';


function HomePage() {

  const {category = ""} = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNews();
  }, [loadNews]);

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  },[category, query]);

  return (
    <div>
      <Hero/>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <CategoryList/>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} headlines` : "Top headlines"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Showing {articles.length} of {totalResults.toLocaleString()} articles
            </p>
          </div>
        </div>

        <NewsList articles={articles} loading={loading} error={error}/>

        {maxPage > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              Page {page} of {maxPage}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= maxPage}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
