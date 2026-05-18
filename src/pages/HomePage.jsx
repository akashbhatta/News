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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const PAGE_SIZE = 10;
  const fetchNews = useCallback(async()=>{
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
    }catch(err){
     console.log("API error:", err);
     setError("Something went wrong.")
    }finally{
      setLoading(false);
    }
  }, [category, query, page]);

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNews();
  },[fetchNews]);

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
    setQuery("");
  },[category]);

  const maxPage = Math.min(Math.ceil(totalResults/PAGE_SIZE),10);

  return (
    <div>
      <Hero/>
      <SearchBar onSearch= {(q)=> {setQuery(q); setPage(1);}}/>
        <CategoryList/>
        <p>Showing {articles.length} of {totalResults.toLocaleString()} articles
          {category && ` in ${category}`}
        </p>
        <NewsList articles = {articles} loading={loading} error = {error}/>
        {
          maxPage > 1 && (
            <div>
              <button onClick={()=>setPage(page-1)} disabled = {page === 1}>Prev</button>
              <span>Page {page} of {maxPage}</span>
              <button onClick={()=> setPage(page+1)} disabled = {page>=maxPage}>Next</button>
            </div>
          )
        }
    </div>
  )
}

export default HomePage
