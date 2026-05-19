const Loading = () => {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:grid-cols-[220px_1fr]">
          <div className="aspect-[16/10] animate-pulse bg-slate-200 sm:aspect-auto" />
          <div className="space-y-4 p-5">
            <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
            <div className="h-6 w-10/12 animate-pulse rounded-full bg-slate-300" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-8/12 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
