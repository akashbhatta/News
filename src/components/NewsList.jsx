import NewsCard from './NewsCard';
import Loading from './Loading';

function NewsList({articles, loading, error}) {
    if (loading) return <Loading/>;
    if (!articles.length) {
      return (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-950">{error ? "Unable to load headlines" : "No articles found"}</p>
          <p className="mt-2 text-sm text-slate-600">{error || "Try a different search or category."}</p>
        </div>
      );
    }
  return (
    <section className="space-y-4">
        {error && (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {error}
          </p>
        )}
        <p className="text-sm font-semibold text-slate-500">{articles.length} articles found</p>
        <div className="grid gap-4">
        {articles.map ((article)=>(
            <NewsCard key = {article.url} article={article}/>
        ))}
        </div>
    </section>
  )
}

export default NewsList
