import React from 'react'
import { useNavigate } from 'react-router-dom'


function NewsCard({article}) {
    const navigate = useNavigate();
    
    const handleClick = () =>{
        navigate('/news/${encodeURIComponent(article.url)}');
    };
  return (
    <div onClick={handleClick}>
        <img
          src={article.urlToImage}
          alt={article.title}
          onError={(e) => (e.target.display = "none")}
        />
    <h3>{article.title}</h3>
    <p>{article.source?.name}</p>
    <p>{article.description}</p>
    </div>
  )
}
export default NewsCard