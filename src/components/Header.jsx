export default function Header({ onOpenAdd }) {
  return (
    <div className="header">
      <div className="brand">
        <h1>Biblioteca</h1>
        <span className="tag">Open Library • localStorage</span>
      </div>
      <button className="btn primary" onClick={onOpenAdd}>+ Agregar a Favoritos</button>
    </div>
  )
}
