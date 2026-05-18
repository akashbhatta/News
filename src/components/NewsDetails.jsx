import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function NewsDetails({articles}) {
    const {articleURl} = useParams();
    const navigate = useNavigate();
    
    const decoded = decodeURIComponent(articleURl);
    const article = articles.find((a)=>a.url === decoded);
    if(!article) return <p>Article not found. <button onClick={()=>navigate("/")}>Go back</button></p>
  return (
    <div>
        <button onClick={()=> navigate(-1)}>Back</button>
        <h1>{article.title}</h1>
        {article.urlToImage && (
            <img src= {article.urlToImage}
            alt={article.title}
            onError={(e)=>(e.target.style.display="none")}/>
        )}
        <p>{article.source?.name}</p>
        <p>{article.content || article.description}</p>
        <a href= {article.url} target='_blank' rel='noopener noreferrer'>Read Full Article</a>
    </div>
  )
}

export default NewsDetails