import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(()=>{
    function onEsc(e){ if(e.key==='Escape') onClose?.() }
    if(open) document.addEventListener('keydown', onEsc)
    return ()=> document.removeEventListener('keydown', onEsc)
  },[open,onClose])
  if(!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  )
}
