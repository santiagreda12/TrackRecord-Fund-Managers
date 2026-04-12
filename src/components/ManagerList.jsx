import React, { useState, useMemo, useContext } from 'react';
import { Search, X } from 'lucide-react';
import { DataContext } from '../App';
import ManagerCard from './ManagerCard';

// Todos los tags disponibles agrupados por categoría
const TAG_GROUPS = {
  'Estilo':    ['Value', 'Growth', 'Alternativo', 'Flexible', 'Crédito'],
  'País':      ['España', 'Francia', 'Europa', 'Global'],
  'Activo':    ['Renta Variable', 'Renta Fija', 'High Yield', 'Bonos'],
  'Sector':    ['Tecnología', 'Energía', 'Minería', 'Materias Primas', 'Crypto', 'Emergentes'],
  'Estrategia': ['Small Caps', 'Mid Caps', 'Internacional', 'Iberia', 'Contrarian', 'Concentrado', 'Disruptivo', 'Largo Plazo'],
};

const ALL_TAGS = Object.values(TAG_GROUPS).flat();

const ManagerList = ({ toggleCompare, compareList }) => {
  const managersData = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleTag = (tag) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setActiveTags([]);
    setSearchTerm('');
  };

  const filteredManagers = useMemo(() => {
    return managersData.filter(manager => {
      // Buscar en nombre, entidad, país, descripción, tags y nombres de fondos
      const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const searchLower = removeAccents(searchTerm.toLowerCase());
      const allText = removeAccents([
        manager.name,
        manager.entity,
        manager.country,
        manager.description,
        ...(manager.tags || []),
        ...(manager.funds || []).map(f => f.name),
        ...(manager.funds || []).flatMap(f => (f.topPositions || []).map(p => `${p.ticker} ${p.name}`)),
      ].join(' ').toLowerCase());

      const matchesSearch = !searchTerm || allText.includes(searchLower);

      // Debe tener TODOS los tags activos (filtrado AND)
      const matchesTags = activeTags.length === 0 ||
        activeTags.every(tag => (manager.tags || []).includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchTerm, activeTags, managersData]);

  const visibleTags = showAllTags ? ALL_TAGS : ALL_TAGS.slice(0, 12);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center mt-8 mb-8 gap-6">
        <h1 style={{fontSize: '3rem', margin: 0, textAlign: 'center'}}>Descubre el talento <br/> en la gestión de activos</h1>
        <p style={{color: 'var(--text-muted)', fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px'}}>
          Consulta el track-record completo de los mejores gestores de fondos, desde firmas establecidas hasta boutiques de inversión alternativa.
        </p>
        
        {/* Buscador */}
        <div style={{position: 'relative', width: '100%', maxWidth: '600px'}}>
          <Search style={{position: 'absolute', left: '20px', top: '16px', color: 'var(--text-muted)'}} size={20} />
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Buscar por gestor, fondo, país, estilo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} style={{position: 'absolute', right: '20px', top: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Tags filtro */}
        <div style={{width: '100%', maxWidth: '800px'}}>
          {/* Tags activos seleccionados */}
          {activeTags.length > 0 && (
            <div className="flex gap-2 mb-3" style={{flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
              <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Filtrando por:</span>
              {activeTags.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)} style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'var(--accent-primary)', color: 'white',
                  border: 'none', borderRadius: '20px',
                  padding: '4px 12px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '500',
                }}>
                  {tag} <X size={12} />
                </button>
              ))}
              <button onClick={clearAll} style={{
                background: 'transparent', color: 'var(--text-muted)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
                padding: '4px 12px', fontSize: '0.82rem', cursor: 'pointer',
              }}>
                Limpiar todo
              </button>
            </div>
          )}

          {/* Nube de tags */}
          <div className="flex gap-2" style={{flexWrap: 'wrap', justifyContent: 'center'}}>
            {visibleTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  border: activeTags.includes(tag)
                    ? '1px solid var(--accent-primary)'
                    : '1px solid rgba(255,255,255,0.12)',
                  background: activeTags.includes(tag)
                    ? 'rgba(99,102,241,0.2)'
                    : 'rgba(255,255,255,0.03)',
                  color: activeTags.includes(tag)
                    ? 'var(--accent-primary)'
                    : 'var(--text-muted)',
                }}
              >
                {tag}
              </button>
            ))}
            <button
              onClick={() => setShowAllTags(p => !p)}
              style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem',
                cursor: 'pointer', border: '1px dashed rgba(255,255,255,0.15)',
                background: 'transparent', color: 'var(--text-muted)',
              }}
            >
              {showAllTags ? 'Ver menos' : `+${ALL_TAGS.length - 12} más`}
            </button>
          </div>
        </div>
      </div>

      {/* Resultado y conteo */}
      <div className="flex justify-between items-center mb-4" style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
        <span>
          {filteredManagers.length} gestor{filteredManagers.length !== 1 ? 'es' : ''} encontrado{filteredManagers.length !== 1 ? 's' : ''}
          {(activeTags.length > 0 || searchTerm) ? ` para tu búsqueda` : ''}
        </span>
      </div>

      <div className="grid mt-4">
        {filteredManagers.map((manager, idx) => (
          <div key={manager.id} style={{animationDelay: `${idx * 0.1}s`}} className="animate-fade-in">
            <ManagerCard 
              manager={manager} 
              toggleCompare={toggleCompare} 
              isComparing={compareList.includes(manager.id)} 
            />
          </div>
        ))}
        {filteredManagers.length === 0 && (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '64px', color: 'var(--text-muted)'}}>
            <div style={{fontSize: '2rem', marginBottom: '8px'}}>🔍</div>
            <div style={{fontSize: '1.1rem', marginBottom: '8px'}}>Sin resultados</div>
            <div style={{fontSize: '0.9rem'}}>Prueba a cambiar los filtros o el término de búsqueda.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerList;
