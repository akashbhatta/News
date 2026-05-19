import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ article }) => {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    navigate(`/news/${encodeURIComponent(article.url)}`, { state: { article } });
  };

  return (
    <article onClick={handleClick} style={{ cursor: "pointer" }}>
      {article.urlToImage && !hasError && (
        <div ref={imgRef}>
          {!isLoaded && <div aria-hidden="true">{isVisible ? "Loading image..." : ""}</div>}

          {isVisible && (
            <img
              src={article.urlToImage}
              alt={article.title}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              style={{ display: isLoaded ? "block" : "none" }}
            />
          )}
        </div>
      )}

      <h3>{article.title}</h3>
      <p>{article.source?.name}</p>
      <p>{article.description}</p>
    </article>
  );
};

export default NewsCard;
