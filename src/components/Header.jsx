export default function Header({ onOpenAdd }) {
  return (
    <div className="header">
      <div className="brand">
        <img src="/icon.svg" width="28" height="28" alt="logo"/>
        <h1>Biblioteca</h1>
      </div>
      <button className="btn primary" onClick={onOpenAdd}>+ Agregar a Favoritos</button>
    </div>
  )
}
