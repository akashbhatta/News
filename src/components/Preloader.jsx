import { useEffect, useState } from "react";

export default function Preloader({ children = null }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <p>Please Wait..</p>;
  return children;
}
