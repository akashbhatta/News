import { useEffect, useState } from "react";

export default function Preloader({ children = null }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-white" />
          <p className="text-sm font-semibold tracking-wide">Loading NewsApp</p>
        </div>
      </div>
    );
  }
  return children;
}
