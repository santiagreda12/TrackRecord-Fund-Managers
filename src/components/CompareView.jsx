import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '../App';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowLeft, X, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompareView = ({ compareIds, toggleCompare, setCompareIds }) => {
  const managersData = useContext(DataContext);
  const [mgrSearch, setMgrSearch] = useState('');
  
  const selectedManagers = useMemo(() => 
    managersData.filter(m => compareIds.includes(m.id)),
  [managersData, compareIds]);

  // Pre-normalizar gestores para búsqueda super rápida
  const searchableManagers = useMemo(() => {
    const normalize = (str) => str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
    return managersData.map(m => ({
      ...m,
      searchStamp: `${normalize(m.name)} ${normalize(m.entity)} ${(m.tags || []).map(normalize).join(' ')} ${m.funds[0]?.topPositions.map(p => normalize(p.name) + normalize(p.ticker)).join(' ')}`
    }));
  }, [managersData]);

  const filteredManagers = useMemo(() => {
    if (!mgrSearch) return managersData;
    const s = mgrSearch.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return searchableManagers
      .filter(m => m.searchStamp.includes(s))
      // Devolver objeto original sin el stamp para el resto del componente
      .map(({ searchStamp, ...m }) => m);
  }, [searchableManagers, mgrSearch, managersData]);

  // Optimización técnica Base 100 y Cruce de fechas
  const chartData = useMemo(() => {
    if (selectedManagers.length === 0) return [];
    
    // Función auxiliar para normalizar fechas YYYY-MM -> YYYY-MM-01
    const normDate = (d) => d.length === 7 ? `${d}-01` : d;

    // 1. Crear mapas y obtener rangos de fechas (con normalización)
    const histories = selectedManagers.map(m => {
      const history = m.funds[0].history;
      const map = new Map();
      history.forEach(h => map.set(normDate(h.date), h.nav));
      
      const sortedDates = history.map(h => normDate(h.date)).sort();
      return { 
        name: m.name, 
        map, 
        dates: sortedDates,
        firstNav: history[0]?.nav 
      };
    });

    const allUniqueDates = [...new Set(histories.flatMap(h => h.dates))].sort();

    // 2. Encontrar la fecha de inicio de intersección (la fecha de inicio más reciente)
    const firstCommonDate = histories.map(h => h.dates[0]).sort().reverse()[0];

    const baseNavs = {};
    if (firstCommonDate) {
      histories.forEach(h => { 
        // Tomamos el valor de la fecha exacta o el primero posterior si no hay match
        const alignDate = h.dates.find(d => d >= firstCommonDate) || h.dates[h.dates.length - 1];
        baseNavs[h.name] = h.map.get(alignDate); 
      });
    }

    // 3. Generar puntos del gráfico (una sola pasada con Forward-Fill)
    const result = [];
    const lastSeenNavs = {}; // Para persistir valores si hay huecos (ej: datos mensuales vs diarios)

    for (let i = 0; i < allUniqueDates.length; i++) {
      const date = allUniqueDates[i];
      const entry = { date };
      let anyData = false;
      
      for (let j = 0; j < histories.length; j++) {
        const h = histories[j];
        let val = h.map.get(date);
        
        // Forward-fill: Si no hay dato hoy, usar el último conocido
        if (val === undefined) {
            val = lastSeenNavs[h.name];
        } else {
            lastSeenNavs[h.name] = val;
        }

        if (val !== undefined) {
          const base = baseNavs[h.name] || h.firstNav;
          entry[h.name] = parseFloat(((val / base - 1) * 100).toFixed(2));
          anyData = true;
        }
      }
      if (anyData) result.push(entry);
    }

    // Si hay demasiados puntos, decimamos para mejorar rendimiento de Recharts
    if (result.length > 500) {
        const factor = Math.ceil(result.length / 500);
        return result.filter((_, idx) => idx % factor === 0);
    }

    return result;
  }, [selectedManagers]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="animate-fade-in pb-12">
      <div className="flex justify-between items-end mb-8 mt-6">
        <div>
          <h1 style={{fontSize: '2.5rem', marginBottom: '8px'}}>Comparador dinámico</h1>
          <p style={{color: 'var(--text-muted)'}}>Estudia y cruza el rendimiento histórico de los fondos.</p>
        </div>
        <div style={{position: 'relative', width: '300px'}}>
           <input 
             type="text" 
             placeholder="Buscar gestores..." 
             value={mgrSearch}
             onChange={(e) => setMgrSearch(e.target.value)}
             style={{
               width: '100%', padding: '12px 16px', borderRadius: '12px',
               background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
               color: 'white', outline: 'none'
             }}
           />
        </div>
      </div>

      {selectedManagers.length > 0 ? (
        <>
          <div className="card mb-10" style={{padding: '32px', background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)'}}>
            <h3 style={{marginBottom: '24px'}}>Rentabilidad Acumulada (%)</h3>
            <div style={{width: '100%', height: '400px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    {selectedManagers.map((m, idx) => (
                      <linearGradient key={m.id} id={`color${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS[idx]} stopOpacity={0.15}/>
                        <stop offset="95%" stopColor={COLORS[idx]} stopOpacity={0}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="date" hide />
                  <YAxis stroke="var(--text-muted)" fontSize={12} unit="%" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                    itemStyle={{fontSize: '13px', fontWeight: 'bold'}}
                  />
                  {selectedManagers.map((m, idx) => (
                    <Area 
                      key={m.id} type="monotone" dataKey={m.name} stroke={COLORS[idx]} fillOpacity={1} 
                      fill={`url(#color${idx})`} strokeWidth={3} activeDot={{ r: 6 }}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid mb-12" style={{gridTemplateColumns: `repeat(${selectedManagers.length}, 1fr)`, gap: '20px'}}>
            {selectedManagers.map((m, idx) => (
              <div key={m.id} className="card p-6" style={{borderTop: `4px solid ${COLORS[idx]}`}}>
                 <div className="flex items-center gap-3 mb-4">
                    <img src={m.image} alt={m.name} style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} />
                    <div>
                       <h4 style={{margin: 0, fontSize: '1rem'}}>{m.name}</h4>
                       <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{m.entity}</span>
                    </div>
                 </div>
                 <div className="flex justify-between" style={{fontSize: '0.9rem', marginBottom: '8px'}}>
                    <span style={{color: 'var(--text-muted)'}}>Volatilidad</span>
                    <span>{m.funds[0].volatility}%</span>
                 </div>
                 <div className="flex justify-between" style={{fontSize: '0.9rem'}}>
                    <span style={{color: 'var(--text-muted)'}}>Patrimonio</span>
                    <span>{m.funds[0].aum}</span>
                 </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="card text-center mb-12" style={{padding: '100px 0'}}>
           <TrendingUp size={64} style={{margin: '0 auto 24px', opacity: 0.1}} />
           <h3>Selecciona gestores abajo para comparar</h3>
           <p style={{color: 'var(--text-muted)'}}>Puedes comparar hasta 4 gestores simultáneamente.</p>
        </div>
      )}

      {/* Selector de Gestores Mini */}
      <h3 style={{marginBottom: '16px', fontSize: '1.2rem'}}>Plantel de Gestores</h3>
      <div className="card mb-10" style={{padding: '20px', background: 'rgba(255,255,255,0.02)'}}>
        <div className="flex gap-5" style={{flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '10px'}}>
          {filteredManagers.map(m => {
            const isSel = compareIds.includes(m.id);
            const selIdx = compareIds.indexOf(m.id);
            return (
              <button 
                key={m.id} 
                onClick={() => toggleCompare(m.id)}
                style={{
                  flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                  background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  opacity: isSel ? 1 : 0.6, transform: isSel ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <div style={{
                  position: 'relative', width: '56px', height: '56px', borderRadius: '50%', 
                  padding: '2px', border: isSel ? `2px solid ${COLORS[selIdx]}` : '2px solid transparent',
                  boxShadow: isSel ? `0 0 15px ${COLORS[selIdx]}44` : 'none'
                }}>
                  <img src={m.image} alt={m.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                  {isSel && (
                     <div style={{
                       position: 'absolute', top: '-4px', right: '-4px', width: '20px', height: '20px',
                       borderRadius: '50%', background: COLORS[selIdx], color: 'white',
                       fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                     }}>
                       {selIdx + 1}
                     </div>
                  )}
                </div>
                <span style={{fontSize: '0.75rem', fontWeight: '500', color: isSel ? 'white' : 'var(--text-muted)', width: '70px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {m.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompareView;
