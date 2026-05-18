import React from 'react'
import NewsCard from './NewsCard';
import Loading from './Loading';

function NewsList({articles, loading, error}) {
    if (loading) return <Loading/>;
    if (error) return <p>Error:{error}</p>;
    if (!articles.length) return <p>No articles found.</p>;
  return (
    <div>
        <p>{articles.length} articles found</p>
        {articles.map ((article)=>(
            <NewsCard key = {article.url} article={article}/>
        ))}
    </div>
  )
}

export default NewsList