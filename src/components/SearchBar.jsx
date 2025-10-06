import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q,setQ] = useState('programming')
  return (
    <div className="search">
      <input
        placeholder="Buscar libros por título, autor, tema..."
        value={q}
        onChange={e=>setQ(e.target.value)}
        onKeyDown={e=>{ if(e.key==='Enter') onSearch(q) }}
      />
      <button onClick={()=>onSearch(q)}>Buscar</button>
    </div>
  )
}
