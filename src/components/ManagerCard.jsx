import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, MapPin } from 'lucide-react';

const ManagerCard = ({ manager, toggleCompare, isComparing }) => {
  return (
    <Link to={`/gestor/${manager.id}`}>
      <div className="card">
        <div className="card-content">
          <div className="flex items-center gap-4 mb-4">
            <div style={{width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)'}}>
              <img 
                src={manager.image} 
                alt={manager.name} 
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: manager.imagePosition || 'center'
                }} 
              />
            </div>
            <div>
              <h3 style={{margin: '0 0 4px 0', fontSize: '1.25rem'}}>{manager.name}</h3>
              <div className="flex items-center gap-2" style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                <Building2 size={14} />
                <span>{manager.entity}</span>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(manager.id);
              }}
              style={{
                marginLeft: 'auto',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: isComparing ? 'none' : '1px solid rgba(255,255,255,0.1)',
                background: isComparing ? 'var(--accent-primary)' : 'rgba(255,255,255,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isComparing ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isComparing ? '0 0 15px rgba(99,102,241,0.4)' : 'none'
              }}
              title="Comparar gestor"
            >
              <TrendingUp size={14} color={isComparing ? 'white' : 'var(--text-muted)'} />
            </button>
          </div>
          
          <div className="mb-4" style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
            {(manager.tags || []).slice(0, 5).map(tag => (
              <span key={tag} className="tag" style={{
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '20px',
                background: tag === 'Value' ? 'rgba(59,130,246,0.15)' :
                            tag === 'Growth' ? 'rgba(16,185,129,0.15)' :
                            tag === 'Alternativo' ? 'rgba(139,92,246,0.15)' :
                            tag === 'Crédito' || tag === 'Renta Fija' ? 'rgba(245,158,11,0.15)' :
                            'rgba(255,255,255,0.06)',
                color: tag === 'Value' ? '#60a5fa' :
                       tag === 'Growth' ? '#34d399' :
                       tag === 'Alternativo' ? '#a78bfa' :
                       tag === 'Crédito' || tag === 'Renta Fija' ? '#fbbf24' :
                       'var(--text-muted)',
                border: '1px solid',
                borderColor: tag === 'Value' ? 'rgba(59,130,246,0.3)' :
                             tag === 'Growth' ? 'rgba(16,185,129,0.3)' :
                             tag === 'Alternativo' ? 'rgba(139,92,246,0.3)' :
                             tag === 'Crédito' || tag === 'Renta Fija' ? 'rgba(245,158,11,0.3)' :
                             'rgba(255,255,255,0.1)',
              }}>
                {tag}
              </span>
            ))}
            {(manager.tags || []).length > 5 && (
              <span style={{fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.08)'}}>
                +{manager.tags.length - 5} más
              </span>
            )}
          </div>
          
          <p style={{color: 'var(--text-muted)', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
            {manager.description}
          </p>

          <div className="flex justify-between items-center mt-6" style={{paddingTop: '16px', borderTop: '1px solid var(--border-color)'}}>
            <div className="flex gap-2 items-center" style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>
              <MapPin size={14} />
              <span>{manager.country}</span>
            </div>
            <div className="flex items-center gap-2" style={{color: 'var(--accent-green)', fontWeight: '600'}}>
              <TrendingUp size={16} />
              <span>{manager.funds.length} Fondo{manager.funds.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ManagerCard;
