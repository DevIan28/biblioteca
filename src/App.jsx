import { useEffect, useMemo, useState } from 'react'
import './styles.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'
import FavoritesPanel from './components/FavoritesPanel'
import Modal from './components/Modal'
import { loadFavorites, saveFavorites } from './utils/storage'

export default function App(){
  const [query, setQuery] = useState('programming')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState(()=> loadFavorites())
  const [openAdd, setOpenAdd] = useState(false)
  const [form, setForm] = useState({title:'',author:'',year:''})

  useEffect(()=>{ saveFavorites(favorites) }, [favorites])

  async function fetchBooks(q){
    try{
      if(!q?.trim()) { setBooks([]); return }
      setLoading(true); setError('')
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=24`)
      if(!res.ok) throw new Error('Error al consultar la API')
      const data = await res.json()
      setBooks(data.docs || [])
    }catch(err){ setError(err.message) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{
    const t = setTimeout(()=> { fetchBooks(query) }, 350)
    return ()=> clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  function addFavorite(b){
    if(!b.title) return
    const exists = favorites.some(f=> f.title===b.title && f.author===b.author)
    if(exists) return alert('Ese libro ya está en favoritos')
    setFavorites(prev=> [{...b}, ...prev])
  }

  function removeFavorite(index){
    setFavorites(prev => prev.filter((_,i)=> i!==index))
  }

  const results = useMemo(()=> books, [books])

  return (
    <div className="container">
      <Header onOpenAdd={()=>setOpenAdd(true)} />

      <section className="hero hero-books" aria-label="Bienvenida">
        <h2>Explora tu Biblioteca</h2>
        <p>Busca por título, autor o tema. Los resultados aparecen a medida que escribes.</p>
        <SearchBar
          onSearch={(q)=> setQuery(q)}     // enter o botón
          onType={(q)=> setQuery(q)}       // mientras escribe
        />
      </section>

      <h3 className="section-title">Resultados</h3>

      {error && <div className="empty">{error}</div>}
      {loading && (
        <div className="grid">
          {Array.from({length:8}).map((_,i)=>(
            <div className="card" key={i}>
              <div className="skeleton" style={{width:'82px',height:'118px'}}></div>
              <div style={{flex:1,display:'grid',gap:'8px'}}>
                <div className="skeleton" style={{height:'18px', width:'70%'}}></div>
                <div className="skeleton" style={{height:'14px', width:'50%'}}></div>
                <div className="skeleton" style={{height:'34px', width:'40%'}}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="grid">
          {results.map((b,idx)=> (
            <BookCard key={idx} book={b} onAddFav={addFavorite} />
          ))}
        </div>
      )}

      <FavoritesPanel list={favorites} onDelete={removeFavorite} />

      <Modal open={openAdd} onClose={()=>setOpenAdd(false)} title="Agregar libro a Favoritos">
        <form onSubmit={(e)=>{
          e.preventDefault()
          addFavorite({
            title: form.title.trim(),
            author: form.author.trim() || 'Autor desconocido',
            year: form.year.trim() || '—',
            cover: 'https://via.placeholder.com/160x220?text=Libro'
          })
          setForm({title:'',author:'',year:''})
          setOpenAdd(false)
        }}>
          <input placeholder="Título" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
          <input placeholder="Autor" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} />
          <input placeholder="Año" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
          <footer>
            <button type="button" className="btn" onClick={()=>setOpenAdd(false)}>Cancelar</button>
            <button className="btn primary" type="submit">Guardar</button>
          </footer>
        </form>
      </Modal>
    </div>
  )
}
