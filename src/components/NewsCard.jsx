import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://picsum.photos/seed/news-card/900/600";

const NewsCard = ({ article }) => {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const seededFallback = `https://picsum.photos/seed/${encodeURIComponent(article.url || article.title || FALLBACK_IMAGE)}/900/600`;
  const imageSrc = hasError || !article.urlToImage ? seededFallback : article.urlToImage;

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
    <article
      onClick={handleClick}
      className="group grid cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:grid-cols-[220px_1fr]"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div ref={imgRef} className="relative aspect-[16/10] overflow-hidden bg-slate-100 sm:aspect-auto sm:min-h-full">
        {!isLoaded && (
          <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-slate-200" />
        )}

        {isVisible && (
          <img
            src={imageSrc}
            alt={article.title}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
            className={`h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] ${
              isLoaded ? "block" : "hidden"
            }`}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/35 to-transparent" />
      </div>

      <div className="flex min-w-0 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>{article.source?.name || "News source"}</span>
          {article.publishedAt && (
            <>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </div>
        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-950 transition group-hover:text-blue-700">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
          {article.description || article.content || "Open the article to read more."}
        </p>
        <span className="mt-auto text-sm font-bold text-blue-700">Read story</span>
      </div>
    </article>
  );
};

export default NewsCard;
