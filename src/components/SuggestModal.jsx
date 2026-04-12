import React, { useState } from 'react';
import { X, Send, UserPlus, CheckCircle } from 'lucide-react';

const SuggestModal = ({ onClose }) => {
  const [form, setForm] = useState({ nombre: '', fondo: '', motivo: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.fondo.trim()) return;
    setStatus('loading');

    try {
      const res = await fetch('http://localhost:3001/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Error desconocido.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('No se pudo conectar con el servidor.');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
        }}
      >
        {/* Modal */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, #1a1f35 0%, #141824 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px', padding: '40px',
            width: '100%', maxWidth: '480px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            animation: 'slideUp 0.25s ease',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'rgba(99,102,241,0.15)', padding: '10px', borderRadius: '10px' }}>
                <UserPlus size={22} color="#6366f1" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Sugerir Gestor</h2>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  ¿Alguien que debería estar aquí? O escríbenos a <a href="mailto:laminenbo3@gmail.com" style={{color: 'var(--accent-primary)'}}>laminenbo3@gmail.com</a>
                </p>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={22} />
            </button>
          </div>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={56} color="#10b981" style={{ marginBottom: '16px' }} />
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem' }}>¡Gracias por tu sugerencia!</h3>
              <p style={{ color: 'var(--text-muted)', margin: '0 0 24px 0' }}>La revisaré próximamente para añadirla a la plataforma. También puedes contactarme en <a href="mailto:laminenbo3@gmail.com" style={{color: 'var(--accent-primary)', fontWeight: '500'}}>laminenbo3@gmail.com</a></p>
              <button onClick={onClose} style={{ background: '#10b981', border: 'none', borderRadius: '10px', padding: '12px 32px', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}>
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>
                  Nombre del Gestor *
                </label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="ej. Warren Buffett"
                  maxLength={100}
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', padding: '12px 16px',
                    color: 'white', fontSize: '0.95rem', outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>
                  Fondo o Gestora *
                </label>
                <input
                  name="fondo"
                  value={form.fondo}
                  onChange={handleChange}
                  placeholder="ej. Magallanes Value Investors"
                  maxLength={100}
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', padding: '12px 16px',
                    color: 'white', fontSize: '0.95rem', outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>
                  ¿Por qué debería estar aquí? (opcional)
                </label>
                <textarea
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  placeholder="Estilo de inversión, track-record relevante..."
                  maxLength={300}
                  rows={3}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', padding: '12px 16px',
                    color: 'white', fontSize: '0.95rem', outline: 'none',
                    resize: 'vertical', fontFamily: 'inherit',
                  }}
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>
                  {form.motivo.length}/300
                </div>
              </div>

              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#ef4444', fontSize: '0.9rem' }}>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !form.nombre.trim() || !form.fondo.trim()}
                style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none', borderRadius: '10px',
                  color: 'white', fontWeight: '600', fontSize: '1rem',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  opacity: (!form.nombre.trim() || !form.fondo.trim()) ? 0.5 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <Send size={18} />
                {status === 'loading' ? 'Enviando...' : 'Enviar Sugerencia'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SuggestModal;
