import React, { useEffect, useState } from 'react'

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchNews = async ()=>{
      try{
        const response = await axios.get(
          "https://newsdata.io/api/1/latest",
          {
            params:{
              apikey: "pub_559b33decaf041f9bb6cb4e0f08c0d71",
              country: "in,np,cl,ru,wo",
              language: "en,ne",
              category: "crime,health,food,sports,world",
              video: 1,
              removeduplicate: 1,
              size: 8,
            },
          }
        );
        setArticles(response.data.results || []);
      }
      catch(err){
        setError("Failed to fetch news");
        console.error(err);
      }
      finally{
        setLoading(false);
      }
    }
    fetchNews();
  },[]);
  if (loading) return <h2>Loading news..</h2>
  if (error) return <h2>{error}</h2>
  return (
   <div>
    <h1>Latest News</h1>
    {articles.map((article, index)=>(
    <div key = {index}>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a href= {article.link} target='_blank'  rel='noreferrer'>Readmore</a>
    </div>
    ))}
   </div>
  )
}

export default News