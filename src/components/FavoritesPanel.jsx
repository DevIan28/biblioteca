import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

export default function FavoritesPanel({ list, onDelete }) {
  const [toRemove, setToRemove] = useState(null)
  return (
    <section className="panel">
      <header>
        <strong>⭐ Mis Favoritos</strong>
        <small className="badge">{list.length} guardados</small>
      </header>
      <div className="content">
        {list.length===0 && <div className="empty">No hay favoritos agregados aún.</div>}
        <div className="grid">
          {list.map((b,idx)=> (
            <article key={idx} className="card">
              <img src={b.cover || 'https://via.placeholder.com/150x220?text=No+Cover'} alt={b.title} />
              <div style={{display:'flex',flexDirection:'column'}}>
                <h3>{b.title}</h3>
                <p>{b.author} • {b.year || '—'}</p>
                <footer>
                  <button className="btn danger" onClick={()=>setToRemove(idx)}>Eliminar</button>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ConfirmDialog
        open={toRemove!==null}
        onCancel={()=>setToRemove(null)}
        onConfirm={()=>{ onDelete(toRemove); setToRemove(null) }}
        message="¿Deseas eliminar este libro de tus favoritos?"
      />
    </section>
  )
}
