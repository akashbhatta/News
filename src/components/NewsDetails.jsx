import { useLocation, useNavigate, useParams } from "react-router-dom";

function NewsDetails() {
  const { articleUrl } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const decoded = decodeURIComponent(articleUrl || "");
  const article = state?.article;

  if (!article) {
    return (
      <p>
        Article not found in this session.{" "}
        <a href={decoded} target="_blank" rel="noopener noreferrer">
          Open source
        </a>{" "}
        <button type="button" onClick={() => navigate("/")}>
          Go back
        </button>
      </p>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      <p>{article.source?.name}</p>
      <p>{article.content || article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>
    </div>
  );
}

export default NewsDetails;
