import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, Briefcase, MessageSquare, Clock, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSugerencias = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
          ? 'http://localhost:3001/api/suggestions' 
          : '/api/suggestions';
        const res = await fetch(API_URL);
        const data = await res.json();
        setSuggestions(data.reverse()); // Mostrar las más recientes primero
      } catch (err) {
        console.error('Error cargando sugerencias', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  if (loading) return <div className="container mt-12 text-center text-muted">Cargando sugerencias...</div>;

  return (
    <div className="animate-fade-in pb-12">
      <Link to="/" className="flex items-center gap-2 mb-8" style={{color: 'var(--text-muted)', display: 'inline-flex', marginTop: '20px'}}>
        <ArrowLeft size={20} />
        <span>Volver al inicio</span>
      </Link>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 style={{fontSize: '2.5rem', marginBottom: '8px'}}>Buzón de Sugerencias</h1>
          <p style={{color: 'var(--text-muted)'}}>Revisa las propuestas de los usuarios para nuevos gestores y fondos.</p>
        </div>
        <div className="card" style={{padding: '12px 24px', background: 'rgba(255,255,255,0.03)'}}>
          <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-primary)'}}>{suggestions.length}</span>
          <span style={{marginLeft: '8px', color: 'var(--text-muted)', fontSize: '0.9rem'}}>Sugerencias totales</span>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="card text-center" style={{padding: '64px'}}>
          <MessageSquare size={48} style={{margin: '0 auto 16px', color: 'var(--text-muted)', opacity: 0.3}} />
          <h3>No hay sugerencias pendientes</h3>
          <p style={{color: 'var(--text-muted)'}}>Cuando los usuarios envíen propuestas, aparecerán aquí.</p>
        </div>
      ) : (
        <div className="grid" style={{gridTemplateColumns: '1fr', gap: '16px'}}>
          {suggestions.map((s, idx) => (
            <div key={idx} className="card animate-fade-in" style={{
              animationDelay: `${idx * 0.05}s`,
              borderLeft: '4px solid var(--accent-primary)',
              padding: '24px'
            }}>
              <div className="flex justify-between items-start">
                <div style={{flex: 1}}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2" style={{color: 'var(--accent-primary)', fontWeight: '600'}}>
                      <User size={16} />
                      <span>{s.nombre}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                      <Briefcase size={16} />
                      <span>{s.fondo}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: 'auto'}}>
                      <Clock size={14} />
                      <span>{new Date(s.fecha).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    <MessageSquare size={14} style={{display: 'inline', marginRight: '8px', opacity: 0.5}} />
                    {s.motivo || <span style={{fontStyle: 'italic'}}>Sin descripción adicional.</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSugerencias;
