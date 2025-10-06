export default function BookCard({ book, onAddFav }) {
  const title = book.title
  const author = (book.author_name && book.author_name[0]) || 'Autor desconocido'
  const year = book.first_publish_year || '—'
  const coverId = book.cover_i
  const cover = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : `https://via.placeholder.com/150x220?text=No+Cover`

  return (
    <article className="card">
      <img src={cover} alt={title} loading="lazy"/>
      <div style={{display:'flex',flexDirection:'column'}}>
        <h3>{title}</h3>
        <p>{author} • {year}</p>
        <footer>
          <button className="btn" onClick={()=>onAddFav({title,author,year,cover})}>⭐ Añadir a Favoritos</button>
        </footer>
      </div>
    </article>
  )
}
