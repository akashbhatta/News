import { useEffect, useState } from 'react'

function SearchBar({ onSearch }) {
    const [input, setInput] = useState("");

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if (input.trim()) onSearch(input.trim());
        },500);
        return () => clearTimeout(timer);
    },[input, onSearch]);
  return (
    <div role='search'>
        <input
        type='text'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>e.key === "Enter" && onSearch(input.trim())}
        placeholder='Search news...'
        />
    {input && (
        <button type="button" onClick={()=>{setInput(""); onSearch("")}}>x</button>
    )}
    </div>
  )
}

export default SearchBar
