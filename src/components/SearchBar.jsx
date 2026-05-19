import { useEffect, useState } from 'react'

function SearchBar({ onSearch, value = "", className = "" }) {
    const [input, setInput] = useState(value);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if (input.trim() !== value.trim()) {
                onSearch(input.trim());
            }
        },500);
        return () => clearTimeout(timer);
    },[input, onSearch, value]);
  return (
    <div role='search' className={`relative w-full ${className}`}>
        <input
        type='text'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>e.key === "Enter" && onSearch(input.trim())}
        placeholder='Search news...'
        className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 pr-12 text-base text-slate-950 shadow-sm transition placeholder:text-slate-400 focus:border-blue-600"
        />
    </div>
  )
}

export default SearchBar
