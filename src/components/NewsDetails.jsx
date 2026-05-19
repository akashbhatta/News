import { useLocation, useNavigate, useParams } from "react-router-dom";

function NewsDetails() {
  const { articleUrl } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const decoded = decodeURIComponent(articleUrl || "");
  const article = state?.article;

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-slate-950">Article not found</h1>
          <p className="mt-3 text-slate-600">This article was opened from a previous session.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={decoded}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Open source
            </a>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        Back
      </button>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {article.source?.name || "News source"}
      </div>
      <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="mt-8 aspect-[16/9] w-full rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
      <p className="mt-6 text-lg leading-8 text-slate-700">{article.content || article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
      >
        Read Full Article
      </a>
      </div>
    </article>
  );
}

export default NewsDetails;
