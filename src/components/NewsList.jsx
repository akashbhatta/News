import NewsCard from './NewsCard';
import Loading from './Loading';

function NewsList({articles, loading, error}) {
    if (loading) return <Loading/>;
    if (!articles.length) return <p>{error ? `Error: ${error}` : "No articles found."}</p>;
  return (
    <div>
        {error && <p>{error}</p>}
        <p>{articles.length} articles found</p>
        {articles.map ((article)=>(
            <NewsCard key = {article.url} article={article}/>
        ))}
    </div>
  )
}

export default NewsList
