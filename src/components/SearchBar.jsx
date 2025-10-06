import { useState } from 'react'

export default function SearchBar({ onSearch, onType }) {
  const [q,setQ] = useState('programming')

  function handleChange(v){
    setQ(v)
    onType?.(v)  
  }

  return (
    <div className="search">
      <input
        placeholder="Buscar libros por título, autor o tema..."
        value={q}
        onChange={e=>handleChange(e.target.value)}
        onKeyDown={e=>{ if(e.key==='Enter') onSearch?.(q) }}
        aria-label="Buscar libros"
      />
      <button onClick={()=>onSearch?.(q)} aria-label="Ejecutar búsqueda">Buscar</button>
    </div>
  )
}
