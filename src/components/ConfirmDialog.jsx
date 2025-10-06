import Modal from './Modal'

export default function ConfirmDialog({ open, onCancel, onConfirm, message='¿Seguro?' }) {
  return (
    <Modal open={open} onClose={onCancel} title="Confirmar eliminación">
      <p style={{color:'#9fb3c8'}}>{message}</p>
      <footer>
        <button className="btn" onClick={onCancel}>Cancelar</button>
        <button className="btn danger" onClick={onConfirm}>Eliminar</button>
      </footer>
    </Modal>
  )
}
